
export default function SearchingPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
            <div className="space-y-6 max-w-2xl animate-pulse">
                <h1 className="text-5xl font-bold text-primary">Buscando tus estancias ideales...</h1>
                <p className="text-2xl text-muted-foreground">
                    Estamos analizando accesibilidad, clima y comunidad para ti.
                </p>
                <div className="w-full max-w-md mx-auto h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '50%' }}></div>
                </div>
            </div>
        </main>
    );
}
