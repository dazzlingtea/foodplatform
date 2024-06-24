package org.nmfw.foodietree.domain.product.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.nmfw.foodietree.domain.product.dto.response.ProductFindAllDto;
import org.nmfw.foodietree.domain.product.dto.response.ProductFindByCategoryDto;

import java.util.List;

@Mapper
public interface ProductMapper {

    List<ProductFindAllDto> findAll();

    List<ProductFindByCategoryDto> findCategory();

}
