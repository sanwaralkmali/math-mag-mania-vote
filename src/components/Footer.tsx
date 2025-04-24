export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-500">
          Math and Science Fair {new Date().getFullYear()} | Created for Educational purposes By{' '}
          <a 
            href="https://sanwaralkmali.github.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-game-purple hover:text-game-orange transition-colors"
          >
            Salah Alkmali
          </a>
        </p>
      </div>
    </footer>
  );
}
