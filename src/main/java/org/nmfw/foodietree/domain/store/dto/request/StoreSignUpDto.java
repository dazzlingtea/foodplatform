package org.nmfw.foodietree.domain.store.dto.request;

import lombok.*;
import org.nmfw.foodietree.domain.store.entity.Store;
import org.nmfw.foodietree.domain.store.entity.value.StoreApproveStatus;
import org.nmfw.foodietree.domain.store.entity.value.StoreCategory;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter @Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoreSignUpDto {

    @NotBlank(message = "아이디(email)은 필수 값입니다.")
    @Email(message = "아이디는 email 형태로 입력되어야합니다.")
//    @Pattern(regexp = "^[\\w!#$%&'*+/=?`{|}~^.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
//            message = "아이디는 email 형태로 입력되어야합니다.")
    // _@_.com 최소 7자
    // 최대 50자 (varchar(50))
    @Size(min = 7, max = 50)
    private String account;

    @NotBlank(message = "비밀번호는 필수 값입니다")
//    @Size(min = 8, message = "비밀번호는 8글자 이상이어야합니다")
    @Pattern(regexp = "^[a-zA-Z]{8,}$", message = "비밀번호는 영문, 8글자 이상이어야합니다.")
    private String password;

    public Store toEntity(){
        return Store.builder()
                .storeId(this.account)
                .password(this.password)
                .build();
    }
}
