"use client";

import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { createProduct, getProductById, fetchTypeList } from '../api/actions';
import SelectProductCategory from "./select-product-category";
import { Input, InputGroup } from "@/components/input";
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from "@/components/dialog";
import { Button } from "@/components/button";
import SkuCreator from "@/components/sku-creator";
import { useRouter } from 'next/navigation';
import SuccessAlert from '@/components/success-alert';

// 可以添加一个必填标记的辅助组件
const RequiredLabel = ({ children }) => (
    <span>
        {children}
        <span className="text-red-500 ml-1">*</span>
    </span>
);

// 添加上传文件的函数
const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filepath', 'products');

    try {
        const response = await fetch('https://mokuapp.online/unicoCommon/common/upload/file', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        console.log('文件上传响应：', result);

        if (result.success) {
            return result.result;
        }
        throw new Error(result.message || '上传失败');
    } catch (error) {
        console.error('文件上传失败：', error);
        throw error;
    }
};

export default function EditProduct({ id }) {
    const router = useRouter();
    const [product, setProduct] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        typeId: '',
        subTitle: '',
        mainPic: '',
        pics: [],
        content: '',
        status: 0,
        sortNum: 0,
        specs: []
    });

    const [categories, setCategories] = useState([]);

    // 添加 loading 状态
    const [isUploading, setIsUploading] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [isGlobalDragging, setIsGlobalDragging] = useState(false);

    // 添加状态控制弹窗
    const [isSkuDialogOpen, setIsSkuDialogOpen] = useState(false);

    // 添加状态控制成功提示的显示
    const [showSuccess, setShowSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    // 添加 LoadingOverlay 组件
    const LoadingOverlay = () => (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
            <div className="text-white text-xl flex items-center space-x-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
            </div>
        </div>
    );

    // 在组件挂载时获取产品类别
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetchTypeList();



                setCategories(result); // 假设 fetchTypeList 返回的是类别数组
            } catch (error) {
                console.error('获取类别失败：', error.message);
            }
        };

        fetchCategories();
    }, []); // 仅在组件挂载时调用

    // 处理输入变化
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // 对价格输入做特殊处理
        if (name === 'price') {
            // 只允许数字和小数点，且小数点只能有一个
            const regex = /^\d*\.?\d*$/;
            if (!regex.test(value)) {
                return;
            }
            // 如果输入以小数点开始，自动在前面加0
            if (value.startsWith('.')) {
                setFormData(prev => ({
                    ...prev,
                    [name]: `0${value}`
                }));
                return;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 修改文件上传处理函数
    const handleFileUpload = async (e, type) => {
        const files = e.target.files;
        setIsUploading(true); // 开始上传，设置 loading

        try {
            if (type === 'images') {
                const uploadPromises = Array.from(files).map(file => uploadFile(file));
                const uploadedUrls = await Promise.all(uploadPromises);
                setFormData(prev => ({
                    ...prev,
                    pics: [...prev.pics, ...uploadedUrls]
                }));
            } else if (type === 'video') {
                const videoUrl = await uploadFile(files[0]);
                setFormData(prev => ({
                    ...prev,
                    video: videoUrl
                }));
            }
        } catch (error) {
            alert('文件上传失败：' + error.message);
        } finally {
            setIsUploading(false); // 无论成功失败都结束 loading
        }
    };

    const handleSkuChange = (skus) => {
        // 确保每个 sku 的 properties 是 JSON 字符串
        const processedSkus = skus.map(sku => ({
            ...sku,
            properties: JSON.stringify(sku.properties)
        }));

        setFormData(prev => ({
            ...prev,
            specs: processedSkus
        }));
    };

    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 验证并处理 specs 数据
        const processedFormData = {
            ...formData,
            // specs: formData.specs.map(spec => ({
            //     ...spec,
            //     properties: typeof spec.properties === 'string'
            //         ? JSON.parse(spec.properties)
            //         : spec.properties
            // }))
        };

        // 验证必填字段
        const requiredFields = {
            title: '产品名称',
            price: '价格',
            typeId: '产品类别',
            pics: '产品图片',
            specs: '产品规格'
        };

        const emptyFields = [];

        for (const [field, label] of Object.entries(requiredFields)) {
            if (field === 'pics' && (!processedFormData[field] || processedFormData[field].length === 0)) {
                emptyFields.push(label);
            } else if (field === 'specs' && (!processedFormData[field] || processedFormData[field].length === 0)) {
                emptyFields.push(label);
            } else if (!processedFormData[field]) {
                emptyFields.push(label);
            }
        }
        // console.log(processedFormData); // 打印表单数据

        if (emptyFields.length > 0) {
            alert(`请填写以下必填项：\n${emptyFields.join('\n')}`);
            return;
        }

        try {
            setIsLoading(true); // 开始加载
            const result = await createProduct(processedFormData);

            if (result.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    router.push('/commerce/products');
                }, 3000);
            } else {
                throw new Error(result.message || '保存失败');
            }
        } catch (error) {
            alert('保存失败：' + error.message);
        } finally {
            setIsLoading(false); // 结束加载
        }
    };

    // 渲染已上传的图片列表
    const renderUploadedImages = () => {
        if (!formData.pics || formData.pics.length === 0) return null;

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {formData.pics.map((url, index) => (
                    <div
                        key={index}
                        className="relative group aspect-[1/1] w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        style={{ maxWidth: '300px', margin: '0 auto' }}  // 限制每张图片的最大宽度
                    >
                        <img
                            src={url}
                            alt={`uploaded-${index}`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    pics: prev.pics.filter((_, i) => i !== index)
                                }));
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    // 处理全局拖拽事件
    useEffect(() => {
        const handleDragOver = (e) => {
            e.preventDefault();
            setIsGlobalDragging(true);
        };

        const handleDragLeave = (e) => {
            e.preventDefault();
            // 确保只在真正离开窗口时触发
            if (e.clientX <= 0 || e.clientY <= 0 ||
                e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
                setIsGlobalDragging(false);
            }
        };

        const handleDrop = (e) => {
            e.preventDefault();
            setIsGlobalDragging(false);
            setIsDragging(false);
        };

        // 添加全局事件监听
        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('drop', handleDrop);

        return () => {
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('drop', handleDrop);
        };
    }, []);

    // 处理上传区域的拖拽事件
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        setIsGlobalDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            setIsUploading(true);
            try {
                const uploadPromises = files.map(file => uploadFile(file));
                const uploadedUrls = await Promise.all(uploadPromises);
                setFormData(prev => ({
                    ...prev,
                    pics: [...prev.pics, ...uploadedUrls]
                }));
            } catch (error) {
                alert('文件上传失败：' + error.message);
            } finally {
                setIsUploading(false);
            }
        }
    };

    // 在获取产品详情后更新 formData
    useEffect(() => {
        const loadProductDetail = async () => {
            if (id) {
                try {
                    setIsLoading(true); // 开始加载
                    const productDetail = await getProductById(id);
                    setProduct(productDetail);
                    // 更新 formData，添加 id 字段
                    setFormData({
                        id: productDetail.id, // 添加 id 字段
                        title: productDetail.title || '',
                        price: productDetail.price || '',
                        typeId: productDetail.typeId || '',
                        subTitle: productDetail.subTitle || '',
                        mainPic: productDetail.mainPic || '',
                        pics: productDetail.pics || [],
                        content: productDetail.content || '',
                        status: productDetail.status || 0,
                        sortNum: productDetail.sortNum || 0,
                        specs: productDetail.specs || []
                    });
                } catch (error) {
                    console.error('加载商品详情失败：', error);
                    alert('加载商品详情失败：' + error.message);
                } finally {
                    setIsLoading(false); // 结束加载
                }
            }
        };

        loadProductDetail();
    }, [id]);

    return (
        <>
            {/* 添加全局拖拽蒙版 */}
            {isGlobalDragging && (
                <div className="fixed inset-0 bg-gray-900/50 z-50 pointer-events-none">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-white text-xl">释放文件以上传</div>
                    </div>
                </div>
            )}

            {/* 添加 loading 蒙层 */}
            {isLoading && <LoadingOverlay />}

            {/* 添加成功提示 */}
            {showSuccess && (
                <div className="fixed top-4 right-4 z-50">
                    <SuccessAlert description="产品保存成功！3秒后返回列表页" />
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Product</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be publicly visible. Please ensure that you share accurate details.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    <RequiredLabel>Product Name</RequiredLabel>
                                </label>
                                <div className="mt-2">
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    <RequiredLabel>Price</RequiredLabel>
                                </label>
                                <div className="mt-2">
                                    <InputGroup>
                                        {/* <span data-slot="icon">$</span> */}
                                        <Input
                                            type="text"
                                            name="price"
                                            id="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="$ "
                                        />
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <SelectProductCategory
                                    categories={categories}
                                    required={false}
                                    defaultTypeId={formData.typeId} // 传入当前商品的类型ID
                                    onChange={(category) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            typeId: category.id
                                        }))
                                    }}
                                />
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                                    Text Description
                                </label>
                                <div className="mt-2">
                                    <Input
                                        as="textarea"
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows={3}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a few sentences about this product.
                                </p>
                            </div>


                            <div className="sm:col-span-4">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    <RequiredLabel>Product Images</RequiredLabel>
                                </label>
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors duration-200 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-900/25'
                                        }`}
                                >
                                    <div className="text-center">
                                        <PhotoIcon className={`mx-auto h-12 w-12 ${isDragging ? 'text-indigo-500' : 'text-gray-300'}`} aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{isUploading ? '上传中...' : 'Upload a file'}</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => handleFileUpload(e, 'images')}
                                                    className="sr-only"
                                                    disabled={isUploading}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>

                                {/* 将图片预览移到上传框面 */}
                                {formData.pics && formData.pics.length > 0 && (
                                    <div className="mt-6">
                                        <p className="text-sm font-medium text-gray-700 mb-3">Uploaded Images:</p>
                                        <div className="w-full max-w-4xl mx-auto">
                                            {renderUploadedImages()}
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            <RequiredLabel>Product Specifications</RequiredLabel>
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Add and manage product specifications, inventory, and pricing information
                        </p>

                        <div className="mt-10">
                            <Button onClick={() => setIsSkuDialogOpen(true)}>
                                Edit Product Specifications
                            </Button>
                        </div>

                        {/* Display preview of added SKUs */}

                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => router.push('/commerce/products')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>

            {/* 添加SKU编辑弹窗 */}
            <Dialog size="5xl" open={isSkuDialogOpen} onClose={() => setIsSkuDialogOpen(false)}>
                <DialogTitle>编辑产品规格</DialogTitle>
                <DialogDescription>
                    设置产品的规格、价格和库存信息
                </DialogDescription>
                <DialogBody>
                    <SkuCreator
                        skus={formData.specs?.map(spec => ({
                            ...spec,
                            properties: typeof spec.properties === 'string'
                                ? JSON.parse(spec.properties)
                                : spec.properties
                        })) || []}
                        onChange={handleSkuChange}
                    />
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={() => setIsSkuDialogOpen(false)}>取消</Button>
                    <Button onClick={() => setIsSkuDialogOpen(false)}>保存</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
