function Error() {
  return (
    <div>
      <div class="grid place-content-center py-4">
        <div class="text-center">
          <h1 class="error-text text-9xl text-gray-200 dark:text-gray-700">404</h1>

          <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Uh-oh!
          </p>

          <p class="mt-4 text-gray-500 dark:text-gray-400">
            We can't find that page.
          </p>

          <a href="/" class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error;