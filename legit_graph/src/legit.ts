import {
  AddCompany as AddCompanyEvent,
  CreateRequest as CreateRequestEvent,
  CreateSkillRequest as CreateSkillRequestEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SkillValidationComplete as SkillValidationCompleteEvent,
  ValidateRequest as ValidateRequestEvent,
  ValidateSkillRequest as ValidateSkillRequestEvent
} from "../generated/Legit/Legit"
import {
  AddCompany,
  CreateRequest,
  CreateSkillRequest,
  OwnershipTransferred,
  SkillValidationComplete,
  ValidateRequest,
  ValidateSkillRequest
} from "../generated/schema"

export function handleAddCompany(event: AddCompanyEvent): void {
  let entity = new AddCompany(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.companyAddress = event.params.companyAddress
  entity.companyType = event.params.companyType

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreateRequest(event: CreateRequestEvent): void {
  let entity = new CreateRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Legit_id = event.params.id
  entity.isCompany = event.params.isCompany
  entity.companyName = event.params.companyName
  entity.userAccount = event.params.userAccount
  entity.title_companyType = event.params.title.companyType
  entity.title_name = event.params.title.name
  entity.isExecuted = event.params.isExecuted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCreateSkillRequest(event: CreateSkillRequestEvent): void {
  let entity = new CreateSkillRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Legit_id = event.params.id
  entity.userAccount = event.params.userAccount
  entity.skillName = event.params.skillName
  entity.companyName = event.params.companyName
  entity.submissions = event.params.submissions
  entity.isExecuted = event.params.isExecuted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSkillValidationComplete(
  event: SkillValidationCompleteEvent
): void {
  let entity = new SkillValidationComplete(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Legit_id = event.params.id
  entity.userAccount = event.params.userAccount
  entity.skill = event.params.skill

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValidateRequest(event: ValidateRequestEvent): void {
  let entity = new ValidateRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Legit_id = event.params.id
  entity.userAccount = event.params.userAccount
  entity.companyName = event.params.companyName
  entity.title_companyType = event.params.title.companyType
  entity.title_name = event.params.title.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValidateSkillRequest(
  event: ValidateSkillRequestEvent
): void {
  let entity = new ValidateSkillRequest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Legit_id = event.params.id
  entity.userAccount = event.params.userAccount
  entity.skill = event.params.skill
  entity.validator = event.params.validator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
