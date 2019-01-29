package com.javen.testmybatis;

import org.springframework.cglib.beans.BeanGenerator;
import org.springframework.cglib.beans.BeanMap;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: lusheng
 * @date: 2018/11/28 10:41
 * @description:
 */
public class BeanMapTest {
    public static void main(String[] args) {

        Map<String, Class<?>> map = new HashMap<String, Class<?>>();
        map.put("amount", Long.class);
        map.put("platform", Integer.class);
        map.put("virtual", Boolean.class);
        map.put("forbidCredit", Boolean.class);

        Class<?> routeClass = mapToObj(map);

        Map<String, Object> inputMap = new HashMap();
        inputMap.put("forbidCredit", false);
        inputMap.put("amount", 100L);
        inputMap.put("virtual", true);
        inputMap.put("platform", 1);

    }


    public static Class<?> mapToObj(Map<String, Class<?>> map){
        if(CollectionUtils.isEmpty(map)){
            return null;
        }

        BeanGenerator clazz = new BeanGenerator();
        for (Map.Entry<String, Class<?>> attribute : map.entrySet()) {
            clazz.addProperty(attribute.getKey(), attribute.getValue());
        }
        Object object = clazz.create();
        return object.getClass();
    }


    public static <T> T mapToBean(Map<String, Object> map, Class<T> clazz) throws IllegalAccessException, InstantiationException {
        if(CollectionUtils.isEmpty(map) || null == clazz){
            return null;
        }

        T bean = clazz.newInstance();
        BeanMap beanMap = BeanMap.create(bean);
        beanMap.putAll(map);
        return bean;
    }

}
