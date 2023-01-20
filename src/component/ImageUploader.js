import React, { useState } from "react";
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export function ImageUploader() {
  const [images, setImages] = useState([]);

  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        usedCameraButton: false,
        isCrop: false,
        isCropCircle: false,
      });
      console.log("response: ", response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = (value) => {
    const data = images.filter(
      (item) =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };


  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          width={IMAGE_WIDTH}
          source={{
            uri:
              item?.type === "video"
                ? item?.thumbnail ?? ""
                : item.path ?? "file://" + item?.crop?.cropPath,
          }}
          style={styles.media}
        />
        <Pressable
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}
        >
          <Text style={styles.titleDelete}>x</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={[styles.media, styles.uploadButton]} onPress={openPicker}>
        <Text style={styles.openText}>업로드</Text>
      </Pressable>
      <FlatList
        data={images}
        keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
        renderItem={renderItem}
        numColumns={5}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const IMAGE_WIDTH = (width - 40) / 3.5;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 40,
  },
  uploadButton: {
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
  },
  media: {
    height: IMAGE_WIDTH,
    width: IMAGE_WIDTH,
    borderRadius: 11,
    marginRight: 8,
  },
  openText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  openPicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#282828",
    borderRadius: 11,
  },
  titleDelete: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
});
