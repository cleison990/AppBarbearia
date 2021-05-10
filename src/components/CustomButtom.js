import React from 'react';
import styled from 'styled-components/native';



export const CustomButton = styled.TouchableOpacity`
    width: 95%;
    height: 60px;
    background-color: rgba(0, 87, 255, 0.6);
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
`;
export const CustomButtonText = styled.Text`
    font-size: 25px;
    color: #FFF;
    padding-left: 30px;     
`;

export default ({title, onPress, IconSvg}) => {
    return(
        
        <CustomButton onPress={onPress}>
            <IconSvg width="50" height="50" fill="#FFFFFF"/><CustomButtonText>{title}</CustomButtonText>
        </CustomButton>
        
    )

}
