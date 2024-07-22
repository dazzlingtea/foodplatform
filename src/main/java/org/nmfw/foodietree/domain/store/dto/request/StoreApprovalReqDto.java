package org.nmfw.foodietree.domain.store.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.web.bind.annotation.RequestParam;

@Getter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreApprovalReqDto {

    @JsonProperty(value = "bizLicenseNum")
    private String storeLicenseNumber;

    @JsonProperty(value = "bizName")
    private String storeName;

    @JsonProperty(value = "bizAddress")
    private String address;

    @JsonProperty(value = "bizPhoneNum")
    private String storeContact; // businessNumber?

    @JsonProperty(value = "bizCategory")
    private String category;


}
