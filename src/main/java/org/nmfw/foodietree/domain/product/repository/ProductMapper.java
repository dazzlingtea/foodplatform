package org.nmfw.foodietree.domain.product.repository;

import org.apache.ibatis.annotations.Mapper;
import org.nmfw.foodietree.domain.product.dto.response.ProductFindAllDto;
import org.nmfw.foodietree.domain.product.entity.Product;

import java.util.List;

@Mapper
public interface ProductMapper {
    List<ProductFindAllDto> findAll();

}
