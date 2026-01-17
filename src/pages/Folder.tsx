import { FolderVideos } from "../components/shared/FolderVideos";
import { useParams } from "react-router";
import { useFolderData } from "../hooks/useFolder";
import { Footer, Header } from "../components/shared";

export default function FolderPage() {
    const { folderSlug } = useParams();
    const { folderData, isLoading, error } = useFolderData(folderSlug!);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="max-w-7xl mx-auto">
                <div className="lg:px-8 lg:mt-8">
                    <h1 className="text-2xl font-bold text-white mb-4">{folderData?.name}</h1>
                    <FolderVideos videos={folderData?.videos || []} />
                </div>
            </div>
            <Footer />
        </div>
    );
}