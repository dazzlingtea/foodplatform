package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;
import org.nmfw.foodietree.domain.customer.entity.value.IssueCategory;

import java.time.LocalDateTime;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerIssues {
    // from tbl_issue
    private String customerId;
    private int reservationId;
    private String issueCategory;
    private LocalDateTime issueCompleteAt;
    private String issueText;
    private LocalDateTime cancelIssueAt;

    // from tbl_store
    private String storeName;

    // from tbl_customer
    private String nickname;
}
