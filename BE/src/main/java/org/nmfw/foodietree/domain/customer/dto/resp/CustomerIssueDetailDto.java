package org.nmfw.foodietree.domain.customer.dto.resp;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.customer.entity.value.IssueCategory;
import org.nmfw.foodietree.domain.customer.entity.value.IssueStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Builder
public class CustomerIssueDetailDto {
    private String customerId;
    private String nickname;
    private String storeName;
    private IssueStatus issueStatus;
    private IssueCategory issueCategory;
    private LocalDateTime issueCompleteAt;
    private String issueText;
    private LocalDateTime cancelIssueAt;
}
