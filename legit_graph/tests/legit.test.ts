import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddCompany } from "../generated/schema"
import { AddCompany as AddCompanyEvent } from "../generated/Legit/Legit"
import { handleAddCompany } from "../src/legit"
import { createAddCompanyEvent } from "./legit-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let companyAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let companyType = 123
    let newAddCompanyEvent = createAddCompanyEvent(
      name,
      companyAddress,
      companyType
    )
    handleAddCompany(newAddCompanyEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddCompany created and stored", () => {
    assert.entityCount("AddCompany", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddCompany",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "AddCompany",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddCompany",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyType",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
