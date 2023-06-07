import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostsContext } from "../../context/PostsContext";

import { styles } from "./styles";
import { Image, TextAlignLeft, UserCircle } from "phosphor-react-native";
import { THEME } from "../../theme";
import { Input } from "../../components/input";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import PostImagePicker from "../../components/PostImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";

function CreatePost() {
  const { user } = useContext(AuthContext);
  const { createPost } = useContext(PostsContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<ImageFile>();

  const [isTextPost, setIsTextPost] = useState<boolean>(false);
  const [isImagePost, setIsImagePost] = useState<boolean>(false);

  function handleIsTextPost() {
    setIsTextPost(true);
    setIsImagePost(false);
  }

  function handleIsImagePost() {
    setIsImagePost(true);
    setIsTextPost(false);
  }

  const isButtonDisabled = title == "" || (description == "" && !image);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <UserCircle color={THEME.COLORS.GRAY_LIGHT} size={48} weight="thin" />
        <Text style={styles.userNameText}>{user}</Text>
      </View>
      <Spacer />
      <Text style={styles.textLg}>Criar Post</Text>
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
      <View style={styles.buttonsContaier}>
        <TouchableOpacity
          style={styles.postTypebutton}
          onPress={handleIsTextPost}
        >
          <TextAlignLeft size={24} />
          <Text style={styles.textMd}>Texto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postTypebutton}
          onPress={handleIsImagePost}
        >
          <Image size={24} />
          <Text style={styles.textMd}>Imagem</Text>
        </TouchableOpacity>
      </View>
      {isTextPost && (
        <>
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
        </>
      )}
      {isImagePost && (
        <>
          <Spacer />
          <PostImagePicker onFileLoaded={setImage} />
        </>
      )}
      <Spacer />
      <Button
        title="Postar"
        onPress={() => {
          createPost({ title, description, image });
        }}
        disabled={isButtonDisabled}
        style={isButtonDisabled ? styles.disabledPostButton : styles.postButton}
      />
    </SafeAreaView>
  );
}

export default CreatePost;
