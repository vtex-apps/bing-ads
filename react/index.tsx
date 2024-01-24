import { PixelMessage } from './typings/events'
import { canUseDOM } from 'vtex.render-runtime'

function handleMessages(e: PixelMessage) {
  if (e.data.eventName === "vtex:orderPlaced") {
    window.uetq = window.uetq || [];
    window.uetq.push('event', 'purchase', {
      'transaction_id': e?.data?.transactionId,
      'ecomm_prodid': e?.data?.transactionProducts.map(item=>item.skuRefId),
      'ecomm_pagetype': 'purchase',
      'ecomm_totalvalue': e?.data?.transactionTotal,
      'revenue_value': e?.data?.transactionTotal,
      'currency': e?.data?.transactionCurrency,
      'items': e?.data?.transactionProducts.map(item=>({id:item.skuRefId, quantity:item.quantity, price:item.price}))
    })
}}

if (canUseDOM) {
  window.addEventListener('message', handleMessages)}
