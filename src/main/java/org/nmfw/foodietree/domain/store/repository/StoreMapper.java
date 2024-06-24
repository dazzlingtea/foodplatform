package org.nmfw.foodietree.domain.store.repository;

import org.apache.ibatis.annotations.Mapper;

import org.nmfw.foodietree.domain.store.entity.Store;

@Mapper
public interface StoreMapper {
    boolean save(Store store);
}
