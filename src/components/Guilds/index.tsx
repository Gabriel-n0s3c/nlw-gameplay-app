import React from "react";
import { FlatList, View } from "react-native";
import { styles } from "./style";

import { Guild, GuildProps } from "../Guild";
import { ListDivider } from "../ListDivider";

type Props = {
  handleGuildSelected: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelected }: Props) {
  const guilds = [
    {
      id: "1",
      name: "Lendários",
      icon: "data:image/png;base64,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",
      owner: true,
    },
    {
      id: "2",
      name: "Lendários",
      icon: "data:image/png;base64,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",
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelected(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{paddingBottom: 68, paddingTop:104}}
        ListHeaderComponent={() => <ListDivider isCentered/>}
      />
    </View>
  );
}
