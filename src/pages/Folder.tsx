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
                    <div className="flex items-center gap-2 mb-4 px-6 lg:px-0">
                        <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <h1 className="text-2xl font-bold text-white">{folderData?.name}</h1>
                    </div>
                    <div className="px-6 lg:px-0 mb-4">
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                            <p className="text-yellow-200 text-sm">Halaman ini mengandung iklan. Harap berhati-hati saat mengklik iklan.</p>
                        </div>
                    </div>
                    <FolderVideos videos={folderData?.videos || []} />
                </div>
            </div>
            <Footer />
        </div>
    );
}