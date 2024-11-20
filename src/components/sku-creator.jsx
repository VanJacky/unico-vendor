"use client";

import React, { useState, useEffect } from "react";
import cartesian from "../utils/cartesian";
import { uuid } from "../utils";
import { Input } from "./input";
import { Field, FieldGroup } from "./fieldset";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "./table";
import CreatableSelect from "react-select/creatable";

const SkuCreator = (props) => {
  const { skus, onChange } = props;
  const defaultProperties = [];
  console.log("skus:", skus);
  skus?.forEach((sku) => {
    const properties = Array.isArray(sku.properties) 
      ? sku.properties 
      : [];

    properties?.forEach((prop, i) => {
      if (prop.name && prop.value) {
        const currentProp = defaultProperties.find((p) => p.name === prop.name);
        if (currentProp) {
          !currentProp.values?.includes(prop.value) &&
            currentProp.values?.push(prop.value);
        } else {
          defaultProperties.push({
            name: prop.name,
            key: uuid(),
            values: [prop.value],
          });
        }
      }
    });
  });

  const [totalProperties, setTotalProperties] = useState(defaultProperties);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [rows, setRows] = useState(skus ?? []);

  const createOption = (label) => ({
    label,
    value: label,
  });

  const property = {
    add() {
      setTotalProperties((prev) => [
        ...prev,
        {
          name: "",
          key: uuid(),
          values: [],
        },
      ]);
    },
    remove(i) {
      setTotalProperties((prev) => {
        const ret = JSON.parse(JSON.stringify(prev));
        ret.splice(i, 1);
        return ret;
      });
    },
    onChangeName(i, name) {
      setTotalProperties((prev) => {
        const ret = [...prev];
        ret[i].name = name;
        return ret;
      });
    },
    onChangeValues(i, newValue) {
      setTotalProperties((prev) => {
        const ret = [...prev];
        ret[i].values = newValue ? newValue.map(item => item.value) : [];
        return ret;
      });
    },
  };

  const sku = {
    onChangePrice(r, price) {
      setRows((prev) => {
        r.price = price;
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
    onChangeStock(r, stock) {
      setRows((prev) => {
        r.stock = Number(stock);
        const ret = JSON.parse(JSON.stringify(prev));
        return ret;
      });
    },
  };

  useEffect(() => {
    let _isShowDetail = false;
    const _rows = [];
    const properties = [];
    totalProperties.forEach((prop) => {
      if (prop.name && prop.values?.length) {
        const cartesianItem = [];
        _isShowDetail = true;
        prop.values.forEach((value) => {
          cartesianItem.push({
            name: prop.name,
            value,
          });
        });
        properties.push(cartesianItem);
      }
    });

    const cartesianProperties = cartesian(...properties);
    cartesianProperties?.forEach((e, i) => {
      const existingSku = skus?.find(sku => {
        const skuProps = Array.isArray(sku.properties) ? sku.properties : [];
        const currentProps = Array.isArray(e) ? e : [e];
        
        return JSON.stringify(skuProps.sort()) === JSON.stringify(currentProps.sort());
      });

      _rows.push({
        key: i,
        skuId: existingSku?.skuId || uuid(),
        properties: Array.isArray(e) ? e : [e],
        price: existingSku?.price || '',
        stock: existingSku?.stock || ''
      });
    });

    const colSpanArray = {};
    const rowCount = [];
    _rows.forEach((r, rindex) => {
      r.properties?.forEach((p, pindex) => {
        if (!colSpanArray[p.name]) {
          colSpanArray[p.name] = [];
        }
        if (rowCount[pindex] !== p.value) {
          colSpanArray[p.name].push(rindex - 1);
          rowCount[pindex] = p.value;
          if (rindex + 1 === _rows.length) {
            colSpanArray[p.name].push(rindex);
          }
        } else {
          if (rindex + 1 === _rows.length) {
            colSpanArray[p.name].push(rindex);
          }
        }
      });
    });

    setIsShowDetail(_isShowDetail);
    setRows(_rows);
  }, [totalProperties]);

  useEffect(() => {
    onChange?.(rows);
  }, [rows]);

  return (
    <>
      <FieldGroup>
        {totalProperties.map((prop, i) => (
          <div key={prop.key} className="flex items-center gap-4 mb-4">
            <Input
              addonBefore="Name"
              placeholder="Specification Name"
              defaultValue={prop.name}
              onChange={(e) => property.onChangeName(i, e.target.value)}
            />
            <CreatableSelect
              isMulti
              isClearable
              className="w-full"
              placeholder="Enter specification attribute and press enter..."

              value={prop.values?.map(value => ({ label: value, value }))}
              options={prop.values?.map(value => ({ label: value, value }))}
              onChange={(newValue) => property.onChangeValues(i, newValue)}
              onCreateOption={(inputValue) => {
                const newOption = createOption(inputValue);
                property.onChangeValues(i, [
                  ...(prop.values?.map(value => ({ label: value, value })) || []),
                  newOption
                ]);
              }}
            />
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => property.remove(i)}
            >
              Remove
            </button>
          </div>
        ))}
        {totalProperties.length < 10 && (
          <button
            type="button"
            className="border border-dashed border-gray-300 px-4 py-2 rounded hover:border-gray-400"
            onClick={property.add}
          >
            Add Variant
          </button>
        )}
      </FieldGroup>
      {isShowDetail ? (
        <FieldGroup>
          <Table>
            <TableHead>
              <TableRow>
                {totalProperties.map((prop) => (
                  <TableHeader key={prop.name}>{prop.name}</TableHeader>
                ))}
                <TableHeader>Price</TableHeader>
                <TableHeader>Stock</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={row.key}>
                  {row.properties.map((p, pIndex) => {
                    const colSpan = row.properties.filter((v) => v.name === p.name).length;
                    return (
                      <TableCell key={p.value} rowSpan={colSpan > 1 ? colSpan : 1}>
                        {p.value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Input
                      placeholder="$ 0.00"
                      value={row.price || ""}
                      onChange={(e) => sku.onChangePrice(row, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.stock || ""}
                      onChange={(e) => sku.onChangeStock(row, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FieldGroup>
      ) : null}
    </>
  );
};

export default SkuCreator;
