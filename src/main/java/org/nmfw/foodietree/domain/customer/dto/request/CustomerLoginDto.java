package org.nmfw.foodietree.domain.customer.dto.request;

import lombok.*;
import org.hibernate.validator.constraints.br.TituloEleitoral;
import org.springframework.web.bind.annotation.GetMapping;

@Setter @Getter @ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Builder
public class CustomerLoginDto {

    private String customerId;
    private String customerPassword;
    private boolean autoLogin; //자동로그인 체크 여부

}

