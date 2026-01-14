export default function Header() {
  return (
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center space-x-2 mb-4 md:mb-0">
                    <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <i class="fas fa-subway text-white text-xl"></i>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-900">Delhi Route Optimizer</h1>
                        <p class="text-sm text-gray-600">Metro + Bus Integration</p>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-4 items-center">
                    <a href="javascript:void(0)" class="text-gray-700 hover:text-primary font-medium">Home</a>
                    <a href="javascript:void(0)" class="text-gray-700 hover:text-primary font-medium">Features</a>
                    <a href="javascript:void(0)" class="text-gray-700 hover:text-primary font-medium">Metro Map</a>
                    <a href="javascript:void(0)" class="text-gray-700 hover:text-primary font-medium">Bus Routes</a>
                    <a href="javascript:void(0)" class="text-gray-700 hover:text-primary font-medium">Fare Calculator</a>
                    <button class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    </header>
  );
}
