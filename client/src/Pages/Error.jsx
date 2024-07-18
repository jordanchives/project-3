function Error() {
  return (
    <div>
      <div class="grid place-content-center py-4">
        <div class="text-center">
          <h1 class="error-text text-9xl text-gray-200 dark:text-gray-700">404</h1>

          <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Uh-oh!
          </p>

          <p class="mb-4 text-[#151624]">
            We can't find that page.
          </p>

          <a href="/" class="error-button bg-gradient-to-r from-[#F2A007] to-[#f0560f] rounded-full text-white py-2 px-4 hover:bg-[#f0560f] hover:to-[#F2A007] transtion ease-in duration-200">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;