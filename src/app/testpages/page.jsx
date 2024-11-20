'use client'
import _ from "lodash";

import { useState } from 'react'
import SkuCreator from '@/components/sku-creator'

export default function Example() {
  const [skus, setSkus] = useState([])

  const handleSkuChange = (newSkus) => {
    setSkus(newSkus)
    console.log('SKUs changed:', newSkus)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SKU 创建器测试</h1>

      <div className="border rounded-lg p-4">
        <SkuCreator
          skus={skus}
          onChange={handleSkuChange}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">当前 SKU 数据:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(skus, null, 2)}
        </pre>
      </div>
    </div>
  )
}
