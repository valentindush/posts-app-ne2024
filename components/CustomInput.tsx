import React from "react";
import { TextInput, View, TextInputProps, StyleProp, ViewStyle } from "react-native";
import twrnc from 'twrnc';

interface InputProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: string;
  inputStyle?: StyleProp<ViewStyle>;
  LeftIcon?: React.ComponentType<any>;
  iconProps?: object;
}

const CustomInput: React.FC<InputProps> = ({ 
  containerStyle, 
  inputStyle, 
  LeftIcon, 
  iconProps, 
  ...textInputProps 
}) => {
  return (
    <View style={twrnc`flex-row items-center rounded-lg gap-4 bg-gray-200 border-[#EEEEEE] p-3 ${containerStyle || ''}`}>
      {LeftIcon && <LeftIcon {...iconProps} />}
      <TextInput 
        cursorColor={"gray"}
        style={[twrnc`flex-1 px-2`, inputStyle]}
        {...textInputProps} 
      />
    </View>
  );
};

export default CustomInput;