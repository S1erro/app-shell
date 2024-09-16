import React from 'react';
import {Button, Divider, Form, Slider} from "antd";
import {dividerProps, StorageCapacityRange} from "types";

const DrivesCapacityFormSection = () => {
    return (
        <>
            <Divider {...dividerProps}>Диски и файловые хранилища</Divider>
            <Form.List name={"drivesCapacity"} initialValue={[]}>
                {(fields, {add, remove}) => (
                    <>
                        <Form.Item>
                            <Button onClick={() => add({capacity: StorageCapacityRange.min})} disabled={fields.length >= 3}>
                                Добавить диск
                            </Button>
                        </Form.Item>

                        {fields.map(({key, name}) => (
                            <Form.Item key={key} label={`Размер диска ${key % 3 + 1} (Гб):`}>
                                <Form.Item name={[name, "capacity"]} noStyle>
                                    <Slider
                                        min={StorageCapacityRange.min}
                                        max={StorageCapacityRange.max}
                                        style={{width: '80%'}}
                                        tooltip={{open: true}}
                                    />
                                </Form.Item>
                                <Button onClick={() => remove(name)} style={{marginLeft: 8}}>
                                    Удалить
                                </Button>
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
        </>
    );
};

export default DrivesCapacityFormSection;