"use client";

import React, { useState, useEffect } from "react";
import { uuid } from "../utils";
import { Input } from "./input";
import { FieldGroup } from "./fieldset";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "./table";
import { PhotoIcon } from '@heroicons/react/24/solid';

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

const SkuCreatorSimple = ({ skus = [], onChange }) => {
  const [rows, setRows] = useState(skus.map(sku => ({
    skuId: sku.skuId || uuid(),
    name: sku.name || '',
    price: sku.price || '',
    stock: sku.stock || '',
    images: sku.images || ''
  })) || []);
  const [isUploading, setIsUploading] = useState(false);

  const addRow = () => {
    setRows(prev => [...prev, {
      skuId: uuid(),
      name: '',
      price: '',
      stock: '',
      images: ''
    }]);
  };

  const removeRow = (index) => {
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const updateName = (rowIndex, name) => {
    setRows(prev => {
      const newRows = [...prev];
      newRows[rowIndex].name = name;
      return newRows;
    });
  };

  const updateField = (rowIndex, field, value) => {
    setRows(prev => {
      const newRows = [...prev];
      if (field === 'price') {
        // 只允许数字和小数点，去除其他字符
        const numericValue = value.replace(/[^\d.]/g, '');
        // 确保只有一个小数点
        const parts = numericValue.split('.');
        if (parts.length > 2) {
          newRows[rowIndex][field] = parts[0] + '.' + parts[1];
        } else {
          newRows[rowIndex][field] = numericValue;
        }
      } else if (field === 'stock') {
        newRows[rowIndex][field] = Number(value);
      } else {
        newRows[rowIndex][field] = value;
      }
      return newRows;
    });
  };

  const handleFileUpload = async (rowIndex, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadFile(file);
      setRows(prev => {
        const newRows = [...prev];
        newRows[rowIndex].images = imageUrl;
        return newRows;
      });
    } catch (error) {
      alert('图片上传失败：' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    onChange?.(rows);
  }, [rows]);

  return (
    <FieldGroup>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>规格名称</TableHeader>
            <TableHeader>规格图片</TableHeader>
            <TableHeader>价格</TableHeader>
            <TableHeader>库存</TableHeader>
            <TableHeader>操作</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.skuId}>
              <TableCell>
                <Input
                  placeholder="规格名称"
                  value={row.name}
                  onChange={e => updateName(index, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-4">
                  {row.images ? (
                    <div className="relative w-16 h-16">
                      <img
                        src={row.images}
                        alt="规格图片"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ) : (
                    <PhotoIcon className="h-16 w-16 text-gray-300" />
                  )}
                  <label className="relative cursor-pointer">
                    <span className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {isUploading ? '上传中...' : (row.images ? '更换图片' : '上传图片')}
                    </span>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(index, e)}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  placeholder="0.00"
                  value={row.price}
                  onChange={e => updateField(index, 'price', e.target.value)}
                  type="text"
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="0"
                  value={row.stock}
                  onChange={e => updateField(index, 'stock', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeRow(index)}
                >
                  删除
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <button
        type="button"
        className="mt-4 border border-dashed border-gray-300 px-4 py-2 rounded hover:border-gray-400"
        onClick={addRow}
      >
        添加规格
      </button>
    </FieldGroup>
  );
};

export default SkuCreatorSimple; 