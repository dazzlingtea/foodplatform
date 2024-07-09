package org.nmfw.foodietree.domain.customer.entity.value;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public enum IssueCategory {
    PRODUCT("상품"),
    STORE("업체"),
    SYSTEM("시스템"),
    ETC("기타");
    private final String issueName;

    public static IssueCategory fromString(String issueCategory) {
        for (IssueCategory category : IssueCategory.values()) {
            if (issueCategory.contains(category.issueName)) {
                return category;
            }
        }
        return IssueCategory.ETC;
    }
}
