export default function NotFoundPage() {
  return (
    <div class="flex flex-col justify-center items-center text-center w-full min-h-screen bg-white">
      <div class="bg-base-100 p-8 rounded-xl shadow-lg">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <p class="text-lg mb-6">Página não encontrada. Verifique o endereço ou retorne.</p>
        <a href="/" class="btn btn-primary">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
}
