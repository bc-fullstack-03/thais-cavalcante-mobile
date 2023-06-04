import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as FeedContext } from "../../context/FeedContext";

import { styles } from "./styles";
import { UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import { Input } from "../../components/input";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import PostImagePicker from "../../components/PostImagePicker";

function CreatePost() {
  const { user } = useContext(AuthContext);
  const { createPost } = useContext(FeedContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<ImageFile>();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <UserCircle color={THEME.COLORS.GRAY_LIGHT} size={48} weight="thin" />
        <Text style={styles.userNameText}>{user}</Text>
      </View>
      <Spacer />
      <Input.Root>
        <Input.Input
          value={title}
          onChangeText={setTitle}
          placeholder="Qual é o título do post?"
          placeholderTextColor={THEME.COLORS.GRAY_DARK}
          autoCorrect={false}
        />
      </Input.Root>
      <Spacer />
      <Input.Root>
        <Input.Input
          value={description}
          onChangeText={setDescription}
          placeholder="Qual é a descrição do post?"
          placeholderTextColor={THEME.COLORS.GRAY_DARK}
          autoCorrect={false}
        />
      </Input.Root>
      <Spacer />
      <PostImagePicker onFileLoaded={setImage} />
      <Spacer />
      <Button
        title="Postar"
        onPress={() => {
          createPost({ title, description, image });
        }}
      />
    </View>
  );
}

export default CreatePost;
