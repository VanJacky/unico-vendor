'use client';

import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectProductCategory({ categories, required = false, onChange, defaultTypeId }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (categories && categories.length > 0) {
      let defaultCategory
      
      // 如果有默认类型ID，查找对应的分类
      if (defaultTypeId) {
        defaultCategory = categories.find(cat => cat.id === defaultTypeId)
      }
      
      // 如果没找到对应分类或没有默认ID，使用第一个分类
      if (!defaultCategory) {
        defaultCategory = categories[0]
      }

      setSelected(defaultCategory)
      onChange?.(defaultCategory)
    }
  }, [categories, defaultTypeId]) // 添加 defaultTypeId 作为依赖

  // 如果还没有数据，显示加载状态
  if (!categories || categories.length === 0) {
    return <div>加载分类中...</div>
  }

  return (
      <Listbox value={selected} onChange={(value) => {
        setSelected(value)
        onChange?.(value)
      }}>
        {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                Category{required && <span className="text-red-500 ml-1">*</span>}
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate">{selected?.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
                </Listbox.Button>

                <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {categories.map((category) => (
                        <Listbox.Option
                            key={category.id}
                            className={({ active }) =>
                                classNames(
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-8 pr-4'
                                )
                            }
                            value={category}
                        >
                          {({ selected, active }) => (
                              <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {category.name}
                        </span>

                                {selected ? (
                                    <span
                                        className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                        )}
                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                ) : null}
                              </>
                          )}
                        </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
        )}
      </Listbox>
  )
}