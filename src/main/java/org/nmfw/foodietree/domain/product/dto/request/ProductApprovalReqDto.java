package org.nmfw.foodietree.domain.product.dto.request;

import lombok.*;
import org.hibernate.validator.constraints.Range;
import org.nmfw.foodietree.domain.product.Util.FileUtil;
import org.nmfw.foodietree.domain.product.entity.ProductApproval;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 상품 등록 요청 DTO
public class ProductApprovalReqDto {

    @Value("${file.upload.root-path}")
    private String rootPath;

    @NotBlank
    @Pattern(regexp = "3900|5900|7900")
    private int price;

    @NotBlank
    @Range(min=1, max=50)
    private int productCnt;

    @NotBlank
    private MultipartFile productImage;


}
