package org.nmfw.foodietree.domain.customer.dto.request;

import lombok.*;
import org.nmfw.foodietree.domain.customer.entity.Customer;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class SignUpDto {

    //고객에게 받을 정보
    @NotBlank
    @Size(min=5, max=50)
    @Email
    private String customerId; // 아이디(이메일 입력 varchar(50))

    @NotBlank
    @Size(min=8, max=8)
    private String customerPassword; // 비밀번호(8자)

    @NotBlank
    @Size(min=5, max=10)
    private String nickName; // 닉네임(varchar(10))

    @Size(min=5, max=15)
    private String customerPhoneNumber; // 전화번호

    public Customer toEntity() {
        return Customer.builder()
                .customerId(this.customerId)
                .customerPassword(this.customerPassword)
                .nickName(this.nickName)
                .customerPhoneNumber(this.customerPhoneNumber)
                .build();
    }
}