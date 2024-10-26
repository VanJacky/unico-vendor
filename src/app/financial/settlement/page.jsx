import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'
import {
    Pagination,
    PaginationGap,
    PaginationList,
    PaginationNext,
    PaginationPage,
    PaginationPrevious,
} from '@/components/pagination'
import React from "react";
import {RefundOrder} from "@/app/orders/[id]/refund";
import {Button} from "@/components/button";


export function Stat({ title, value, change }) {
    return (
        <div>
            <Divider />
            <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
            <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
            <div className="mt-3 text-sm/6 sm:text-xs/6">
                <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
                <span className="text-zinc-500">from last week</span>
            </div>
        </div>
    )
}


export default async function Home() {
  let orders = await getRecentOrders()

  return (
      <>

          <Heading>Overview</Heading>
          <div className="mt-8 flex items-end justify-between">
              {/*<Subheading>Overview</Subheading>*/}
              <div>
                  <Select name="period">
                      <option value="last_week">Last week</option>
                      <option value="last_two">Last two weeks</option>
                      <option value="last_month">Last month</option>
                      <option value="last_quarter">Last quarter</option>
                  </Select>
              </div>
          </div>
          <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              <Stat title="Total revenue" value="$2.6M" change="+4.5%"/>
              <Stat title="Total Expenses" value="$455" change="-0.5%"/>
              <Stat title="Products sold" value="5,888" change="+4.5%"/>
              {/*<Stat title="Pageviews" value="823,067" change="+21.2%" />*/}
          </div>

          <div className="mt-14 flex justify-between items-center">
              <Subheading>Settled Statement</Subheading>
              <div>
                  <Button>Export</Button>
              </div>
          </div>
          <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
              <TableHead>
                  <TableRow>
                      <TableHeader>ID</TableHeader>
                      <TableHeader>Create date</TableHeader>
                      <TableHeader>Settlement Period</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader className="text-right">Amount</TableHeader>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {orders.map((order) => (
                      <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell className="text-zinc-500">{order.date}</TableCell>
                          <TableCell>{order.period}</TableCell>
                          <TableCell>
                              <Badge color="lime">Paid</Badge>
                          </TableCell>

                          {/*<TableCell>*/}
                          {/*  <div className="flex items-center gap-2">*/}
                          {/*    <Avatar src={order.event.thumbUrl} className="size-6" />*/}
                          {/*    <span>{order.event.name}</span>*/}
                          {/*  </div>*/}
                          {/*</TableCell>*/}
                          <TableCell className="text-right">US{order.amount.usd}</TableCell>

                      </TableRow>
                  ))}
              </TableBody>
          </Table>
          <Divider className="mb-12" soft/>

          <Pagination>
              <PaginationPrevious href="?page=2"/>
              <PaginationList>
                  <PaginationPage href="?page=1">1</PaginationPage>
                  <PaginationPage href="?page=2">2</PaginationPage>
                  <PaginationPage href="?page=3" current>
                      3
                  </PaginationPage>
                  <PaginationPage href="?page=4">4</PaginationPage>
                  <PaginationGap/>
                  <PaginationPage href="?page=65">65</PaginationPage>
                  <PaginationPage href="?page=66">66</PaginationPage>
              </PaginationList>
              <PaginationNext href="?page=4"/>
          </Pagination>
      </>
  )
}
