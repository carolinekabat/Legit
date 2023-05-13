// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Legit is Ownable {
    // Experience
    enum CompanyType {
        None,
        Education,
        Job,
        Event
    }

    struct Title {
        CompanyType companyType;
        string name;
    }

    // user address => company name => info -> 100% validated
    mapping(address => mapping(string => Title)) validated;

    struct Request {
        // Shows whether the company has created a request
        bool isCompany;
        string companyName;
        address userAccount;
        Title title;
        bool isExecuted;
    }

    uint64 currentRequest;
    mapping(uint64 => Request) requests;

    struct CompanyInfo {
        address account;
        CompanyType companyType;
    }

    mapping(string => CompanyInfo) companies;

    // Validated skills
    mapping(address => string[]) skills;

    struct SkillRequest {
        address userAccount;
        string skillName;
        string[] companyNames;
        uint submissions;
        bool isExecuted;
        address[] usedAddresses;
    }

    uint256 public constant MIN_SKILL_SUBMISSION = 3;

    uint64 currentSkillRequest;
    mapping(uint64 => SkillRequest) skillRequests;

    event AddCompany(string name, address companyAddress, CompanyType companyType);

    event CreateRequest(
        uint64 id,
        bool isCompany,
        string companyName,
        address userAccount,
        Title title,
        bool isExecuted
    );

    event ValidateRequest(uint64 id, address userAccount, string companyName, Title title);

    event CreateSkillRequest(
        uint64 id,
        address userAccount,
        string skillName,
        string[] companyName,
        uint submissions,
        bool isExecuted
    );

    event ValidateSkillRequest(uint64 id, address userAccount, string skill, address validator);

    event SkillValidationComplete(uint64 id, address userAccount, string skill);

    function addCompany(
        string calldata _name,
        address _companyAddress,
        CompanyType _companyType
    ) external onlyOwner {
        require(companies[_name].account == address(0), "Company name already exists");

        companies[_name].account = _companyAddress;
        companies[_name].companyType = _companyType;

        emit AddCompany(_name, _companyAddress, _companyType);
    }

    function createRequest(
        bool _isCompany,
        string calldata _companyName,
        address _userAccount,
        string calldata _experienceName
    ) external {
        if (_isCompany) {
            require(
                msg.sender == companies[_companyName].account,
                "Only company can create this request"
            );
        } else {
            require(msg.sender == _userAccount, "The signer can create request only for himself");
        }
        currentRequest += 1;

        Title memory title = Title(companies[_companyName].companyType, _experienceName);
        Request memory request = Request(_isCompany, _companyName, _userAccount, title, false);

        requests[currentRequest] = request;

        emit CreateRequest(currentRequest, _isCompany, _companyName, _userAccount, title, false);
    }

    function validateRequest(uint64 id) external {
        require(requests[id].userAccount != address(0), "Request not found");

        if (requests[id].isCompany) {
            require(msg.sender == requests[id].userAccount, "Only user can validate this request");
        } else {
            require(
                msg.sender == companies[requests[id].companyName].account,
                "Only company can validate this request"
            );
        }

        validated[requests[id].userAccount][requests[id].companyName] = requests[id].title;
        requests[id].isExecuted = true;

        emit ValidateRequest(
            id,
            requests[id].userAccount,
            requests[id].companyName,
            requests[id].title
        );
    }

    function createSkillRequest(
        string calldata _skillName,
        string[] calldata _companyNames
    ) external {
        currentSkillRequest += 1;

        for (uint i = 0; i < _companyNames.length; i++) {
            require(
                validated[msg.sender][_companyNames[i]].companyType != CompanyType.None,
                "User should have experience in specified companies"
            );
        }

        SkillRequest memory request = SkillRequest(
            msg.sender,
            _skillName,
            _companyNames,
            0,
            false,
            new address[](0)
        );

        skillRequests[currentSkillRequest] = request;

        emit CreateSkillRequest(
            currentSkillRequest,
            msg.sender,
            _skillName,
            _companyNames,
            0,
            false
        );
    }

    function validateSkillRequest(uint64 id) external {
        require(skillRequests[id].userAccount != address(0), "Request not found");
        require(msg.sender != skillRequests[id].userAccount, "Can't validate yourself");

        bool is_colleague = false;
        string[] memory companyNames = skillRequests[id].companyNames;
        for (uint i = 0; i < companyNames.length; i++) {
            if (validated[msg.sender][companyNames[i]].companyType != CompanyType.None) {
                is_colleague = true;
            }
        }
        require(is_colleague, "Only colleague can validate the skill");

        address[] memory usedAddresses = skillRequests[id].usedAddresses;
        for (uint i = 0; i < usedAddresses.length; i++) {
            require(msg.sender != usedAddresses[i], "Can't validate yourself");
        }

        skillRequests[id].submissions += 1;
        skillRequests[id].usedAddresses.push(msg.sender);

        if (skillRequests[id].submissions >= MIN_SKILL_SUBMISSION) {
            skills[skillRequests[id].userAccount].push(skillRequests[id].skillName);
            skillRequests[id].isExecuted = true;
            emit SkillValidationComplete(
                id,
                skillRequests[id].userAccount,
                skillRequests[id].skillName
            );
        }

        emit ValidateSkillRequest(
            id,
            skillRequests[id].userAccount,
            skillRequests[id].skillName,
            msg.sender
        );
    }
}
