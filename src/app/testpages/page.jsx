'use client'
import { useState } from 'react'
import SkuCreator from '@/components/sku-creator'
import SkuCreatorSimple from '@/components/sku-creator-simple'

export default function Example() {
  const [skus, setSkus] = useState([])
  const [simpleSkus, setSimpleSkus] = useState([])

  const handleSkuChange = (newSkus) => {
    setSkus(newSkus)
    console.log('SKUs changed:', newSkus)
  }

  const handleSimpleSkuChange = (newSkus) => {
    setSimpleSkus(newSkus)
    console.log('Simple SKUs changed:', newSkus)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SKU 创建器测试</h1>

      <div className="border rounded-lg p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">原版 SKU 创建器</h2>
        <SkuCreator
          skus={skus}
          onChange={handleSkuChange}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">当前 SKU 数据:</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(skus, null, 2)}
          </pre>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">简化版 SKU 创建器</h2>
        <SkuCreatorSimple
          skus={simpleSkus}
          onChange={handleSimpleSkuChange}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">当前简化版 SKU 数据:</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(simpleSkus, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
