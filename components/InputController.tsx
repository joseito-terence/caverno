import React from 'react'
import { View, TextInput, TextInputProps } from 'react-native'
import { Controller, Control, FieldErrors } from 'react-hook-form'

interface InputControllerProps extends TextInputProps {
  name: string;
  required?: boolean;
  control: Control<any>;
  errors: FieldErrors<any>;
}

export default function InputController({
  name,
  required = false,
  control,
  errors,
  ...props
}: InputControllerProps) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className='text-white text-2xl'
            placeholderTextColor={errors[name] && 'red'}
            {...props}
          />
        )}
      />
    </View>
  )
}
