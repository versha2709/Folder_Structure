"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";

const Folder = ({ name, folders, addFolder, depth }) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleCreateFolder = () => {
    if (depth >= 3) {
      alert("Maximum depth of 3 folders can be created.");
      return;
    }
    if (newFolderName) {
      addFolder(newFolderName);
      setNewFolderName("");
      setShowInput(false);
    }
  };

  return (
    <Box ml={2} mt={1} p={1} bgcolor="#e0e0e0" borderRadius={2}>
      <Typography variant="h6">{name}</Typography>
      {folders &&
        folders.map((folder, index) => (
          <Folder
            key={index}
            name={folder.name}
            folders={folder.folders}
            addFolder={folder.addFolder}
            depth={depth + 1}
          />
        ))}
      {showInput ? (
        <Box display="flex" mt={1}>
          <TextField
            variant="outlined"
            size="small"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            fullWidth
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateFolder}
          >
            Create
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowInput(true)}
        >
          Create Folder
        </Button>
      )}

      {folders && folders.length > 0 && (
        <List>
          {folders.map((folder, index) => (
            <ListItem key={index}>
              <Link href={`/folder/${encodeURIComponent(folder.name)}`}>
                <Typography variant="body1">{folder.name}</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Folder;
