import Navbar from "../components/NavbarPro";
import "../App.css"
import Folder from "../components/Folder";
import { useState, useEffect } from "react";

function GalleryPro() {
    const [folders, setFolders] = useState<string[]>([]);
    const [files, setFiles] = useState<string[]>([]);
    const [currentPath, setCurrentPath] = useState<string>("/");

    const foldersPath = currentPath + "../galleryFolders/";

    useEffect(() => {
        async function openFolder() {
            try {
                const response = await fetch(foldersPath);
                if (!response.ok) {
                  throw new Error('Réponse invalide du serveur');
                }
                console.log(response);
                const data = await response.json();
                setFolders(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :');
            }
        }
        openFolder();
    }, []);

    function handleRootClick() {
        setCurrentPath(foldersPath);
        const folder = fetch(foldersPath);
        setFolders([]);
        setFiles([]);
    }

    function handleFolderClick(folderName: string) {
        setCurrentPath(currentPath + folderName + "/");
        setFolders([]);
        setFiles([]);
    }

    function handleBackClick() {
        const path = currentPath.split("/");
        path.pop();
        setCurrentPath(path.join("/"));
        setFolders([]);
        setFiles([]);
    }

    function handleFileClick(fileName: string) {
        console.log(fileName);
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", padding: "0", margin: "0" }}>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "10%", alignItems: "center", justifyContent: "center" }}>
                    <button onClick={handleRootClick}>Root</button>
                    <button onClick={handleBackClick}>Back</button>
                    <p>{currentPath}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "90%", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        {folders.map((folderName, index) => {
                            return <Folder key={index} name={folderName} onClick={() => handleFolderClick(folderName)} />;
                        })}
                        {files.map((fileName, index) => {
                            return <Folder key={index} name={fileName} onClick={() => handleFileClick(fileName)} />;
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GalleryPro;

