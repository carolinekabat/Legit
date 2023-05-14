import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddCompany,
  CreateRequest,
  CreateSkillRequest,
  OwnershipTransferred,
  SkillValidationComplete,
  ValidateRequest,
  ValidateSkillRequest
} from "../generated/Legit/Legit"

export function createAddCompanyEvent(
  name: string,
  companyAddress: Address,
  companyType: i32
): AddCompany {
  let addCompanyEvent = changetype<AddCompany>(newMockEvent())

  addCompanyEvent.parameters = new Array()

  addCompanyEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  addCompanyEvent.parameters.push(
    new ethereum.EventParam(
      "companyAddress",
      ethereum.Value.fromAddress(companyAddress)
    )
  )
  addCompanyEvent.parameters.push(
    new ethereum.EventParam(
      "companyType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(companyType))
    )
  )

  return addCompanyEvent
}

export function createCreateRequestEvent(
  id: BigInt,
  isCompany: boolean,
  companyName: string,
  userAccount: Address,
  title: ethereum.Tuple,
  isExecuted: boolean
): CreateRequest {
  let createRequestEvent = changetype<CreateRequest>(newMockEvent())

  createRequestEvent.parameters = new Array()

  createRequestEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createRequestEvent.parameters.push(
    new ethereum.EventParam("isCompany", ethereum.Value.fromBoolean(isCompany))
  )
  createRequestEvent.parameters.push(
    new ethereum.EventParam(
      "companyName",
      ethereum.Value.fromString(companyName)
    )
  )
  createRequestEvent.parameters.push(
    new ethereum.EventParam(
      "userAccount",
      ethereum.Value.fromAddress(userAccount)
    )
  )
  createRequestEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromTuple(title))
  )
  createRequestEvent.parameters.push(
    new ethereum.EventParam(
      "isExecuted",
      ethereum.Value.fromBoolean(isExecuted)
    )
  )

  return createRequestEvent
}

export function createCreateSkillRequestEvent(
  id: BigInt,
  userAccount: Address,
  skillName: string,
  companyName: Array<string>,
  submissions: BigInt,
  isExecuted: boolean
): CreateSkillRequest {
  let createSkillRequestEvent = changetype<CreateSkillRequest>(newMockEvent())

  createSkillRequestEvent.parameters = new Array()

  createSkillRequestEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  createSkillRequestEvent.parameters.push(
    new ethereum.EventParam(
      "userAccount",
      ethereum.Value.fromAddress(userAccount)
    )
  )
  createSkillRequestEvent.parameters.push(
    new ethereum.EventParam("skillName", ethereum.Value.fromString(skillName))
  )
  createSkillRequestEvent.parameters.push(
    new ethereum.EventParam(
      "companyName",
      ethereum.Value.fromStringArray(companyName)
    )
  )
  createSkillRequestEvent.parameters.push(
    new ethereum.EventParam(
      "submissions",
      ethereum.Value.fromUnsignedBigInt(submissions)
    )
  )
  createSkillRequestEvent.parameters.push(
    new ethereum.EventParam(
      "isExecuted",
      ethereum.Value.fromBoolean(isExecuted)
    )
  )

  return createSkillRequestEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSkillValidationCompleteEvent(
  id: BigInt,
  userAccount: Address,
  skill: string
): SkillValidationComplete {
  let skillValidationCompleteEvent = changetype<SkillValidationComplete>(
    newMockEvent()
  )

  skillValidationCompleteEvent.parameters = new Array()

  skillValidationCompleteEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  skillValidationCompleteEvent.parameters.push(
    new ethereum.EventParam(
      "userAccount",
      ethereum.Value.fromAddress(userAccount)
    )
  )
  skillValidationCompleteEvent.parameters.push(
    new ethereum.EventParam("skill", ethereum.Value.fromString(skill))
  )

  return skillValidationCompleteEvent
}

export function createValidateRequestEvent(
  id: BigInt,
  userAccount: Address,
  companyName: string,
  title: ethereum.Tuple
): ValidateRequest {
  let validateRequestEvent = changetype<ValidateRequest>(newMockEvent())

  validateRequestEvent.parameters = new Array()

  validateRequestEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  validateRequestEvent.parameters.push(
    new ethereum.EventParam(
      "userAccount",
      ethereum.Value.fromAddress(userAccount)
    )
  )
  validateRequestEvent.parameters.push(
    new ethereum.EventParam(
      "companyName",
      ethereum.Value.fromString(companyName)
    )
  )
  validateRequestEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromTuple(title))
  )

  return validateRequestEvent
}

export function createValidateSkillRequestEvent(
  id: BigInt,
  userAccount: Address,
  skill: string,
  validator: Address
): ValidateSkillRequest {
  let validateSkillRequestEvent = changetype<ValidateSkillRequest>(
    newMockEvent()
  )

  validateSkillRequestEvent.parameters = new Array()

  validateSkillRequestEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  validateSkillRequestEvent.parameters.push(
    new ethereum.EventParam(
      "userAccount",
      ethereum.Value.fromAddress(userAccount)
    )
  )
  validateSkillRequestEvent.parameters.push(
    new ethereum.EventParam("skill", ethereum.Value.fromString(skill))
  )
  validateSkillRequestEvent.parameters.push(
    new ethereum.EventParam("validator", ethereum.Value.fromAddress(validator))
  )

  return validateSkillRequestEvent
}
