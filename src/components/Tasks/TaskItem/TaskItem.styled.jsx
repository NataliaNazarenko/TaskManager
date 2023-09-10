import styled from '@emotion/styled';

export const Form = styled.form`
    display: flex;
    width: 100%;
    gap: 4px;
    margin-bottom: 12px;
`;


export const Input = styled.input`
    flex-grow: 1;
    padding: 8px;
    border: 1px solid rgba(33, 33, 33, 0.2);
    border-radius: 4px;
    font: inherit;
    line-height: 16px;
    letter-spacing: 0.01em;
    resize: none;
`;

export const Button = styled.button`
    border: none;
    font: inherit;
    cursor: pointer;
    outline: none;
    padding: 0 8px;
    border-radius: 4px;
    background-color: #3f51b5;
    color: #fff;
    }

    &:hover,
    &:focus {
    background-color: #303f9f;
    }

    &:active {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    }
  
`;