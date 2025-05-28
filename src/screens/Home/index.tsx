import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./style";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";

export function Home() {

    const [category, setCategory] = useState('');

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    const url = IllustrationImg
    return (
        <View >
            <View style={styles.header}>
                <Profile></Profile>
                <ButtonAdd/>
            </View>
            <View >
                <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect} />
            </View>
        </View>
    );
}
