import React, { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { IconButton } from "@/components/IconButton";
import {
  DropdownMenu,
  DropdownMenuItem,
  AlertDialog,
  TextButton,
  Host,
  Icon as EuiIcon,
  Text as ComposeText,
} from "@expo/ui/jetpack-compose";
import MoreVert from "@expo/material-symbols/more_vert.xml";
import EditIcon from "@expo/material-symbols/edit.xml";
import DeleteIcon from "@expo/material-symbols/delete.xml";
import { useStore } from "@/store/useStore";

interface SongMenuProps {
  id: string;
}

export default function SongMenu({ id }: SongMenuProps) {
  const { deleteSong } = useStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Host matchContents>
        <DropdownMenu
          expanded={showMenu}
          onDismissRequest={() => setShowMenu(false)}
          color="#1f2937"
        >
          <DropdownMenu.Trigger>
            <IconButton
              onPress={() => setShowMenu(true)}
              source={MoreVert}
              size={22}
              tint="#FFFFFF"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Items>
            <DropdownMenuItem
              onClick={() => {
                setShowMenu(false);
                router.push(`/songs/${id}/edit`);
              }}
            >
              <DropdownMenuItem.LeadingIcon>
                <EuiIcon source={EditIcon} size={20} tint="#FFFFFF" />
              </DropdownMenuItem.LeadingIcon>
              <DropdownMenuItem.Text>
                <Text className="text-white">Edit</Text>
              </DropdownMenuItem.Text>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setShowMenu(false);
                setShowDelete(true);
              }}
            >
              <DropdownMenuItem.LeadingIcon>
                <EuiIcon source={DeleteIcon} size={20} tint="#FF4444" />
              </DropdownMenuItem.LeadingIcon>
              <DropdownMenuItem.Text>
                <Text className="text-red-400">Delete</Text>
              </DropdownMenuItem.Text>
            </DropdownMenuItem>
          </DropdownMenu.Items>
        </DropdownMenu>
      </Host>

      {showDelete && (
        <Host matchContents>
          <AlertDialog
            onDismissRequest={() => setShowDelete(false)}
          >
            <AlertDialog.Title>
              <ComposeText>Delete Song</ComposeText>
            </AlertDialog.Title>
            <AlertDialog.Text>
              <ComposeText>
                Are you sure you want to delete this song? This action cannot be
                undone.
              </ComposeText>
            </AlertDialog.Text>
            <AlertDialog.ConfirmButton>
              <TextButton
                onClick={async () => {
                  await deleteSong(id);
                  router.back();
                }}
                colors={{ contentColor: "#EF4444" }}
              >
                <ComposeText>Delete</ComposeText>
              </TextButton>
            </AlertDialog.ConfirmButton>
            <AlertDialog.DismissButton>
              <TextButton
                onClick={() => setShowDelete(false)}
              >
                <ComposeText>Cancel</ComposeText>
              </TextButton>
            </AlertDialog.DismissButton>
          </AlertDialog>
        </Host>
      )}
    </>
  );
}
