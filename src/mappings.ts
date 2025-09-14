import {
  PrivateTransfer as PrivateTransferEvent,
  PrivateMint as PrivateMintEvent,
  PrivateBurn as PrivateBurnEvent,
  Deposit as DepositEvent,
  Withdraw as WithdrawEvent,
  AuditorChanged as AuditorChangedEvent,
} from '../generated/EncryptedERCStandalone/EncryptedERC'
import {
  PrivateTransfer,
  PrivateMint,
  PrivateBurn,
  Deposit,
  Withdraw,
  AuditorChanged,
} from '../generated/schema'
import { BigInt, ethereum } from '@graphprotocol/graph-ts'

function idFrom(event: ethereum.Event): string {
  return event.transaction.hash.toHex() + '-' + event.logIndex.toString()
}

export function handlePrivateTransfer(event: PrivateTransferEvent): void {
  const e = new PrivateTransfer(idFrom(event))
  e.txHash = event.transaction.hash.toHex()
  e.block = event.block.number
  e.timestamp = event.block.timestamp
  e.from = event.params.from
  e.to = event.params.to
  e.auditor = event.params.auditorAddress
  // copy fixed array into dynamic array
  const pct = new Array<BigInt>()
  for (let i = 0; i < event.params.auditorPCT.length; i++) {
    pct.push(event.params.auditorPCT[i])
  }
  e.auditorPCT = pct
  e.contract = event.address
  e.save()
}

export function handlePrivateMint(event: PrivateMintEvent): void {
  const e = new PrivateMint(idFrom(event))
  e.txHash = event.transaction.hash.toHex()
  e.block = event.block.number
  e.timestamp = event.block.timestamp
  e.user = event.params.user
  e.auditor = event.params.auditorAddress
  const pct = new Array<BigInt>()
  for (let i = 0; i < event.params.auditorPCT.length; i++) {
    pct.push(event.params.auditorPCT[i])
  }
  e.auditorPCT = pct
  e.contract = event.address
  e.save()
}

export function handlePrivateBurn(event: PrivateBurnEvent): void {
  const e = new PrivateBurn(idFrom(event))
  e.txHash = event.transaction.hash.toHex()
  e.block = event.block.number
  e.timestamp = event.block.timestamp
  e.user = event.params.user
  e.auditor = event.params.auditorAddress
  const pct = new Array<BigInt>()
  for (let i = 0; i < event.params.auditorPCT.length; i++) {
    pct.push(event.params.auditorPCT[i])
  }
  e.auditorPCT = pct
  e.contract = event.address
  e.save()
}

export function handleDeposit(event: DepositEvent): void {
  const e = new Deposit(idFrom(event))
  e.txHash = event.transaction.hash.toHex()
  e.block = event.block.number
  e.timestamp = event.block.timestamp
  e.user = event.params.user
  e.amount = event.params.amount
  e.dust = event.params.dust
  e.tokenId = event.params.tokenId
  e.contract = event.address
  e.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  const e = new Withdraw(idFrom(event))
  e.txHash = event.transaction.hash.toHex()
  e.block = event.block.number
  e.timestamp = event.block.timestamp
  e.user = event.params.user
  e.amount = event.params.amount
  e.tokenId = event.params.tokenId
  e.auditor = event.params.auditorAddress
  const pct = new Array<BigInt>()
  for (let i = 0; i < event.params.auditorPCT.length; i++) {
    pct.push(event.params.auditorPCT[i])
  }
  e.auditorPCT = pct
  e.contract = event.address
  e.save()
}

export function handleAuditorChanged(event: AuditorChangedEvent): void {
  const e = new AuditorChanged(idFrom(event))
  e.txHash = event.transaction.hash.toHex()
  e.block = event.block.number
  e.timestamp = event.block.timestamp
  e.oldAuditor = event.params.oldAuditor
  e.newAuditor = event.params.newAuditor
  e.contract = event.address
  e.save()
}

