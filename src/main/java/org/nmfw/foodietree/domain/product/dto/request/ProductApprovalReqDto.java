package org.nmfw.foodietree.domain.product.dto.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductApprovalReqDto {

    // 상품 등록 요청 DTO

    @NotNull
    private int price;

    @NotNull
    @Range(min=1, max=50)
    private int productCnt;

    private MultipartFile productImage;

    @Setter
    private String storeId;

}
