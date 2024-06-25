"use client";

import { useState } from "react";
import Folder from "./Folder";
import { Box, TextField, Button, Typography } from "@mui/material";

const FolderList = () => {
  const [folders, setFolders] = useState([]);

  const addFolder = (name) => {
    setFolders([
      ...folders,
      {
        name,
        folders: [],
        addFolder: (folderName, depth) =>
          addNestedFolder(folderName, folders.length, 1),
      },
    ]);
  };

  const addNestedFolder = (name, parentIndex, depth) => {
    let newFolders = [...folders];

    if (parentIndex >= 0 && parentIndex < newFolders.length) {
      let parentFolder = newFolders[parentIndex];

      if (!parentFolder.folders) {
        parentFolder.folders = [];
      }

      if (depth < 3) {
        parentFolder.folders.push({
          name,
          folders: [],
          addFolder: (folderName) =>
            addNestedFolder(
              folderName,
              parentFolder.folders.length - 1,
              depth + 1
            ),
        });
        setFolders(newFolders);
      } else {
        alert("Maximum depth of 3 folders can be created.");
      }
    } else {
      console.error(`Parent folder at index ${parentIndex} does not exist.`);
    }
  };

  return (
    <Box
      bgcolor="#fff"
      p={2}
      borderRadius={2}
      boxShadow={2}
      width="80%"
      maxWidth="900px"
    >
      <Typography variant="h4" textAlign="center" color="#333">
        Folder Structure
      </Typography>
      {folders.map((folder, index) => (
        <Folder
          key={index}
          name={folder.name}
          folders={folder.folders}
          addFolder={(name) => addNestedFolder(name, index, 1)}
          depth={1}
        />
      ))}
      <Box display="flex" mt={2}>
        <TextField
          variant="outlined"
          size="small"
          id="root-folder-name"
          placeholder="Root folder name"
          fullWidth
          sx={{ marginRight: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const folderName =
              document.getElementById("root-folder-name").value;
            if (folderName) {
              addFolder(folderName);
              document.getElementById("root-folder-name").value = "";
            } else {
              alert("Folder name cannot be empty.");
            }
          }}
        >
          Create Root Folder
        </Button>
      </Box>
    </Box>
  );
};

export default FolderList;
