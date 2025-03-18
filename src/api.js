/**
 * api.js - Comprehensive Mock API for CodeQuest
 *
 * This file contains all API functions for the CodeQuest platform
 * In a production environment, these would connect to actual backend services
 */

// Mock user data
const users = [
  {
    id: "user1",
    email: "demo@codequest.io",
    password: "password123", // In a real app, this would be hashed
    name: "Demo User",
    avatar: "https://via.placeholder.com/150",
    role: "free",
    joined: "2024-01-15",
    preferences: {
      theme: "dark",
      fontSize: 14,
      language: "javascript",
      notifications: true,
    },
    progress: {
      xp: 1250,
      level: 5,
      streak: 7,
      completedChallenges: ["js1", "js2", "py1"],
      completedProjects: ["proj1"],
      certifications: [],
    },
  },
];

// Mock programming languages data
const languages = [
  {
    id: "flutter",
    name: "Flutter",
    icon: "🦋",
    description:
      "Google's UI toolkit for building natively compiled applications",
    difficulty: "Intermediate",
    path: [
      {
        id: "flutter_intro",
        title: "Introduction to Flutter",
        content: `
# Introduction to Flutter

Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.

## What is Flutter?

Flutter is an open-source framework that uses the Dart programming language. It allows developers to build high-performance, visually attractive applications that run smoothly on different platforms.

## Key Features of Flutter

- **Hot Reload**: Make changes to your code and see them instantly in your app
- **Single Codebase**: Write once, deploy anywhere
- **Widget-based**: Everything in Flutter is a widget
- **Native Performance**: Flutter compiles to native code for each platform

## Setting Up Flutter

1. Download Flutter SDK from [flutter.dev](https://flutter.dev)
2. Extract the ZIP file to a desired location
3. Add Flutter to your PATH
4. Run \`flutter doctor\` to verify installation
5. Install IDE extensions (VS Code or Android Studio)

## Your First Flutter App

Let's create a simple "Hello World" app:

\`\`\`dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
\`\`\`

## Try It Yourself

Modify the "Hello World" text to display your name instead.
        `,
      },
      {
        id: "flutter_dart",
        title: "Dart Fundamentals for Flutter",
        content: `
# Dart Fundamentals for Flutter

Dart is the programming language used to write Flutter applications. Let's learn the basics.

## Variables and Data Types

Dart is a statically typed language but offers type inference with the \`var\` keyword.

\`\`\`dart
// Explicitly typed
String name = 'John';
int age = 30;
double height = 1.85;
bool isStudent = true;

// Type inference
var country = 'USA';      // String
var population = 331000000;  // int
\`\`\`

## Functions

Functions in Dart are objects and can be assigned to variables or passed as arguments.

\`\`\`dart
// Basic function
int add(int a, int b) {
  return a + b;
}

// Arrow function (shorthand)
int multiply(int a, int b) => a * b;

// Optional parameters
String greet(String name, [String? title]) {
  return title != null ? 'Hello $title $name' : 'Hello $name';
}

// Named parameters
void introduce({required String name, int age = 0}) {
  print('My name is $name and I am $age years old');
}
\`\`\`

## Control Flow

\`\`\`dart
// If-else statement
if (age >= 18) {
  print('Adult');
} else {
  print('Minor');
}

// For loop
for (int i = 0; i < 5; i++) {
  print(i);
}

// While loop
int counter = 0;
while (counter < 5) {
  print(counter);
  counter++;
}

// Switch statement
String grade = 'A';
switch (grade) {
  case 'A':
    print('Excellent');
    break;
  case 'B':
    print('Good');
    break;
  default:
    print('Unknown grade');
}
\`\`\`

## Collections

\`\`\`dart
// Lists
List<String> fruits = ['Apple', 'Banana', 'Orange'];
fruits.add('Mango');
print(fruits[0]);  // Apple

// Maps
Map<String, int> scores = {
  'John': 90,
  'Mary': 85,
  'Bob': 78
};
print(scores['John']);  // 90
\`\`\`

## Classes and Objects

\`\`\`dart
class Person {
  // Properties
  String name;
  int age;
  
  // Constructor
  Person(this.name, this.age);
  
  // Named constructor
  Person.guest() : name = 'Guest', age = 0;
  
  // Method
  void introduce() {
    print('My name is $name and I am $age years old');
  }
}

// Usage
var person = Person('John', 30);
person.introduce();

var guest = Person.guest();
guest.introduce();
\`\`\`

## Try It Yourself

Create a \`Car\` class with properties for \`make\`, \`model\`, and \`year\`. Add a method to display the car details.
        `,
      },
      {
        id: "flutter_widgets",
        title: "Basic Flutter Widgets",
        content: `
# Basic Flutter Widgets

Widgets are the building blocks of Flutter apps. Let's explore the essential widgets you'll use frequently.

## Basic Structure

Every Flutter app starts with a structure similar to this:

\`\`\`dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo'),
      ),
      body: Center(
        child: Text('Hello Flutter'),
      ),
    );
  }
}
\`\`\`

## Layout Widgets

These widgets help organize the structure of your app:

### Container

\`\`\`dart
Container(
  padding: EdgeInsets.all(16.0),
  margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(10.0),
  ),
  child: Text('Hello'),
)
\`\`\`

### Row and Column

\`\`\`dart
// Row arranges children horizontally
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: <Widget>[
    Icon(Icons.star),
    Icon(Icons.star),
    Icon(Icons.star),
  ],
)

// Column arranges children vertically
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: <Widget>[
    Text('Item 1'),
    Text('Item 2'),
    Text('Item 3'),
  ],
)
\`\`\`

### Stack

Overlays widgets on top of each other:

\`\`\`dart
Stack(
  children: <Widget>[
    Image.network('https://example.com/image.jpg'),
    Positioned(
      bottom: 10,
      right: 10,
      child: Text('Caption'),
    ),
  ],
)
\`\`\`

## Basic Widgets

### Text

\`\`\`dart
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)
\`\`\`

### Image

\`\`\`dart
Image.asset('assets/image.png')

Image.network('https://example.com/image.jpg')
\`\`\`

### Button

\`\`\`dart
ElevatedButton(
  onPressed: () {
    // Action
  },
  child: Text('Click Me'),
)

TextButton(
  onPressed: () {
    // Action
  },
  child: Text('Text Button'),
)

IconButton(
  icon: Icon(Icons.favorite),
  onPressed: () {
    // Action
  },
)
\`\`\`

### Input

\`\`\`dart
TextField(
  decoration: InputDecoration(
    labelText: 'Username',
    border: OutlineInputBorder(),
  ),
  onChanged: (value) {
    // Handle input
  },
)
\`\`\`

## Try It Yourself

Create a profile card that displays a person's avatar, name, job title, and a contact button. Use a Column for layout and include appropriate styling.
        `,
      },
      {
        id: "flutter_state",
        title: "State Management",
        content: `
# State Management in Flutter

State management is crucial for building interactive Flutter applications. Let's explore different approaches.

## StatefulWidget

For simple state management, Flutter provides StatefulWidget:

\`\`\`dart
class CounterPage extends StatefulWidget {
  @override
  _CounterPageState createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Counter App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}
\`\`\`

Key points:
- The \`setState()\` method tells Flutter to rebuild the UI with the updated state
- Use StatefulWidget for components that need to manage their own state

## Provider

For more complex applications, Provider is a popular state management solution:

First, add the provider package to your pubspec.yaml:
\`\`\`yaml
dependencies:
  provider: ^6.0.0
\`\`\`

Create a model class:
\`\`\`dart
import 'package:flutter/foundation.dart';

class CounterModel extends ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}
\`\`\`

Set up the provider in your app:
\`\`\`dart
import 'package:provider/provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterModel(),
      child: MyApp(),
    ),
  );
}
\`\`\`

Use the provider in your widgets:
\`\`\`dart
class CounterDisplay extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      '\${context.watch<CounterModel>().count}',
      style: Theme.of(context).textTheme.headline4,
    );
  }
}

class CounterIncrement extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        context.read<CounterModel>().increment();
      },
      child: Icon(Icons.add),
    );
  }
}
\`\`\`

## Other State Management Solutions

Flutter offers several other state management options:

- **Bloc/Cubit**: Separates business logic from UI with streams
- **GetX**: Lightweight state management with minimal boilerplate
- **Riverpod**: An improved version of Provider
- **MobX**: Reactive state management

## When to Use What

- **StatefulWidget**: Simple components with self-contained state
- **Provider**: Medium complexity apps with shared state
- **Bloc**: Complex apps that need clear separation of concerns
- **GetX**: When you want minimal boilerplate code

## Try It Yourself

Modify the counter example to add a reset button and a decrement button using Provider for state management.
        `,
      },

      {
        id: "flutter_navigation",
        title: "Navigation and Routing",
        content: `
# Navigation and Routing in Flutter

Navigation is essential for multi-screen applications. Let's learn how to navigate between screens in Flutter.

## Basic Navigation

The simplest way to navigate between screens is using the Navigator:

\`\`\`dart
// First Screen
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          child: Text('Go to Second Screen'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SecondScreen()),
            );
          },
        ),
      ),
    );
  }
}

// Second Screen
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Second Screen')),
      body: Center(
        child: ElevatedButton(
          child: Text('Go Back'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
\`\`\`

## Passing Data Between Screens

You can pass data to a new screen:

\`\`\`dart
// First Screen
ElevatedButton(
  child: Text('View Details'),
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailScreen(item: 'Item 1'),
      ),
    );
  },
)

// Detail Screen
class DetailScreen extends StatelessWidget {
  final String item;
  
  DetailScreen({required this.item});
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Detail')),
      body: Center(
        child: Text('Details for $item'),
      ),
    );
  }
}
\`\`\`## Returning Data from Screens

You can also return data from a screen:

\`\`\`dart
// First Screen
ElevatedButton(
  child: Text('Pick an option'),
  onPressed: () async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SelectionScreen()),
    );
    
    ScaffoldMessenger.of(context)
      .showSnackBar(SnackBar(content: Text('$result')));
  },
)

// Selection Screen
class SelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Pick an option')),
      body: Column(
        children: <Widget>[
          ListTile(
            title: Text('Option A'),
            onTap: () {
              Navigator.pop(context, 'Option A selected!');
            },
          ),
          ListTile(
            title: Text('Option B'),
            onTap: () {
              Navigator.pop(context, 'Option B selected!');
            },
          ),
        ],
      ),
    );
  }
}
\`\`\`

## Named Routes

For larger apps, named routes provide better organization:

\`\`\`dart
// Define routes in MaterialApp
MaterialApp(
  // Start route
  initialRoute: '/',
  
  // Route definitions
  routes: {
    '/': (context) => HomeScreen(),
    '/details': (context) => DetailScreen(),
    '/settings': (context) => SettingsScreen(),
  },
)

// Navigate using named routes
ElevatedButton(
  child: Text('Go to Details'),
  onPressed: () {
    Navigator.pushNamed(context, '/details');
  },
)

// With arguments
Navigator.pushNamed(
  context,
  '/details',
  arguments: {'id': 1, 'title': 'Product 1'},
);

// Accessing arguments
class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    
    return Scaffold(
      appBar: AppBar(title: Text(args['title'])),
      body: Center(
        child: Text('ID: \${args["id"]}'),
      ),
    );
  }
}
\`\`\`

## Advanced Routing

For more control, you can use onGenerateRoute:

\`\`\`dart
MaterialApp(
  onGenerateRoute: (settings) {
    if (settings.name == '/product') {
      final args = settings.arguments as Map<String, dynamic>;
      return MaterialPageRoute(
        builder: (context) {
          return ProductScreen(id: args['id']);
        },
      );
    }
    // Handle unknown routes
    return MaterialPageRoute(builder: (context) => NotFoundScreen());
  },
)
\`\`\`

## Try It Yourself

Create a simple app with three screens: a home screen with a list of items, a detail screen that shows information about a selected item, and a settings screen accessible from both home and detail screens.
        `,
      },
      {
        id: "flutter_networking",
        title: "HTTP and API Integration",
        content: `
# HTTP and API Integration in Flutter

Most apps need to connect to the internet to fetch or send data. Let's explore how to work with APIs in Flutter.

## HTTP Package

First, add the http package to your pubspec.yaml:

\`\`\`yaml
dependencies:
  http: ^0.13.4
\`\`\`

## Making GET Requests

\`\`\`dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> fetchData() async {
  final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts/1'));
  
  if (response.statusCode == 200) {
    // If the server returns a 200 OK response, parse the JSON
    final data = jsonDecode(response.body);
    print('Title: \${data['title']}');
  } else {
    // If the server did not return a 200 OK response, throw an exception
    throw Exception('Failed to load data');
  }
}
\`\`\`

## POST Requests

\`\`\`dart
Future<void> createPost() async {
  final response = await http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/posts'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'title': 'My Post',
      'body': 'This is a post created from Flutter',
      'userId': '1',
    }),
  );
  
  if (response.statusCode == 201) {
    final data = jsonDecode(response.body);
    print('Created post with ID: \${data['id']}');
  } else {
    throw Exception('Failed to create post');
  }
}
\`\`\`

## Creating Model Classes

For better type safety, create model classes for your API responses:

\`\`\`dart
class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({
    required this.userId,
    required this.id,
    required this.title,
    required this.body,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}

// Using the model
Future<Post> fetchPost() async {
  final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts/1'));
  
  if (response.statusCode == 200) {
    return Post.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load post');
  }
}
\`\`\`

## Displaying Data in UI

Use FutureBuilder to display asynchronous data:

\`\`\`dart
FutureBuilder<Post>(
  future: fetchPost(),
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            snapshot.data!.title,
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(snapshot.data!.body),
        ],
      );
    } else if (snapshot.hasError) {
      return Text('Error: \${snapshot.error}');
    }
    
    // By default, show a loading spinner
    return CircularProgressIndicator();
  },
)
\`\`\`

## Error Handling

Implement proper error handling for network requests:

\`\`\`dart
try {
  final post = await fetchPost();
  print(post.title);
} catch (e) {
  print('Error fetching post: $e');
}
\`\`\`

## Authentication

For authenticated requests:

\`\`\`dart
Future<void> fetchProtectedData(String token) async {
  final response = await http.get(
    Uri.parse('https://api.example.com/protected'),
    headers: {
      'Authorization': 'Bearer $token',
    },
  );
  
  if (response.statusCode == 200) {
    // Handle response
  } else if (response.statusCode == 401) {
    // Handle unauthorized
  } else {
    // Handle other errors
  }
}
\`\`\`

## Try It Yourself

Create a simple app that fetches a list of posts from JSONPlaceholder API (https://jsonplaceholder.typicode.com/posts) and displays them in a ListView. When a post is tapped, navigate to a detail screen showing the full post and comments.
        `,
      },
      {
        id: "flutter_storage",
        title: "Local Storage and State Persistence",
        content: `
# Local Storage and State Persistence in Flutter

Apps often need to store data locally. Let's explore different storage options in Flutter.

## Shared Preferences

Shared Preferences is ideal for storing simple key-value pairs like user settings:

First, add the shared_preferences package:

\`\`\`yaml
dependencies:
  shared_preferences: ^2.0.15
\`\`\`

Using Shared Preferences:

\`\`\`dart
import 'package:shared_preferences/shared_preferences.dart';

// Saving data
Future<void> saveSettings() async {
  final prefs = await SharedPreferences.getInstance();
  
  await prefs.setString('username', 'JohnDoe');
  await prefs.setBool('darkMode', true);
  await prefs.setInt('counter', 42);
  await prefs.setStringList('favorites', ['item1', 'item2']);
  
  print('Settings saved!');
}

// Reading data
Future<void> loadSettings() async {
  final prefs = await SharedPreferences.getInstance();
  
  final username = prefs.getString('username') ?? 'Guest';
  final darkMode = prefs.getBool('darkMode') ?? false;
  final counter = prefs.getInt('counter') ?? 0;
  final favorites = prefs.getStringList('favorites') ?? [];
  
  print('Username: $username');
  print('Dark mode: $darkMode');
  print('Counter: $counter');
  print('Favorites: $favorites');
}

// Removing data
Future<void> clearSettings() async {
  final prefs = await SharedPreferences.getInstance();
  
  // Remove specific key
  await prefs.remove('counter');
  
  // Or clear all data
  await prefs.clear();
}
\`\`\`

## SQLite Database

For structured data and complex queries, use SQLite:

Add the sqflite package:

\`\`\`yaml
dependencies:
  sqflite: ^2.0.2
  path: ^1.8.0
\`\`\`

Using SQLite:

\`\`\`dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

// Database helper class
class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;
  
  DatabaseHelper._init();
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('notes.db');
    return _database!;
  }
  
  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);
    
    return await openDatabase(path, version: 1, onCreate: _createDB);
  }
  
  Future<void> _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    ''');
  }
  
  // CRUD operations
  
  // Create
  Future<int> createNote(Map<String, dynamic> note) async {
    final db = await instance.database;
    return await db.insert('notes', note);
  }
  
  // Read
  Future<List<Map<String, dynamic>>> getNotes() async {
    final db = await instance.database;
    return await db.query('notes', orderBy: 'createdAt DESC');
  }
  
  Future<Map<String, dynamic>?> getNote(int id) async {
    final db = await instance.database;
    final maps = await db.query(
      'notes',
      where: 'id = ?',
      whereArgs: [id],
      limit: 1,
    );
    
    if (maps.isNotEmpty) {
      return maps.first;
    }
    return null;
  }
  
  // Update
  Future<int> updateNote(int id, Map<String, dynamic> note) async {
    final db = await instance.database;
    return await db.update(
      'notes',
      note,
      where: 'id = ?',
      whereArgs: [id],
    );
  }
  
  // Delete
  Future<int> deleteNote(int id) async {
    final db = await instance.database;
    return await db.delete(
      'notes',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
  
  // Close the database
  Future<void> close() async {
    final db = await instance.database;
    db.close();
  }
}

// Using the database helper
Future<void> noteExample() async {
  // Create a note
  final note = {
    'title': 'Shopping List',
    'content': 'Milk, Eggs, Bread',
    'createdAt': DateTime.now().toIso8601String(),
  };
  
  final id = await DatabaseHelper.instance.createNote(note);
  print('Created note with ID: $id');
  
  // Read all notes
  final notes = await DatabaseHelper.instance.getNotes();
  notes.forEach((note) {
    print('\${note["id"]}: \${note["title"]}');
  });
  
  // Update a note
  await DatabaseHelper.instance.updateNote(id, {
    'title': 'Updated Shopping List',
    'content': 'Milk, Eggs, Bread, Cheese',
    'createdAt': DateTime.now().toIso8601String(),
  });
  print('Updated note with ID: $id');
  
  // Delete a note
  await DatabaseHelper.instance.deleteNote(id);
  print('Deleted note with ID: $id');
}
\`\`\`
        `,
      },
    ],
  },
];

// Mock challenges data
const challenges = [
  {
    id: "js1",
    title: "JavaScript: FizzBuzz Challenge",
    description:
      'Write a function that prints numbers from 1 to n, but for multiples of 3 print "Fizz" and for multiples of 5 print "Buzz".',
    difficulty: "Easy",
    language: "js",
    xpReward: 50,
    timeLimit: 15,
    starterCode: `function fizzBuzz(n) {\n  // Your code here\n}\n\n// Test cases\nconsole.log(fizzBuzz(15));`,
    solution: `function fizzBuzz(n) {\n  const result = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0 && i % 5 === 0) {\n      result.push("FizzBuzz");\n    } else if (i % 3 === 0) {\n      result.push("Fizz");\n    } else if (i % 5 === 0) {\n      result.push("Buzz");\n    } else {\n      result.push(i);\n    }\n  }\n  return result;\n}`,
    testCases: [
      { input: "3", expected: '[1, 2, "Fizz"]' },
      { input: "5", expected: '[1, 2, "Fizz", 4, "Buzz"]' },
      {
        input: "15",
        expected:
          '[1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]',
      },
    ],
    hints: [
      "Use the modulo operator (%) to check if a number is divisible by another number",
      "Remember to check for numbers divisible by both 3 and 5 first",
    ],
  },
  {
    id: "py1",
    title: "Python: Palindrome Checker",
    description:
      "Write a function that checks if a string is a palindrome (reads the same forwards and backwards).",
    difficulty: "Easy",
    language: "py",
    xpReward: 50,
    timeLimit: 15,
    starterCode: `def is_palindrome(s):\n    # Your code here\n    pass\n\n# Test cases\nprint(is_palindrome("racecar"))\nprint(is_palindrome("hello"))`,
    solution: `def is_palindrome(s):\n    # Remove spaces and convert to lowercase\n    s = s.lower().replace(" ", "")\n    # Compare string with its reverse\n    return s == s[::-1]`,
    testCases: [
      { input: '"racecar"', expected: "True" },
      { input: '"hello"', expected: "False" },
      { input: '"A man a plan a canal Panama"', expected: "True" },
    ],
    hints: [
      "Consider removing spaces and converting to lowercase for better comparison",
      "Python has a simple way to reverse strings using slice notation [::-1]",
    ],
  },
];

// Mock projects data
const projects = [
  {
    id: "proj1",
    title: "Personal Portfolio Website",
    description:
      "Build a responsive portfolio website using HTML, CSS, and JavaScript.",
    difficulty: "Beginner",
    languages: ["html", "css", "js"],
    estimatedTime: "4 hours",
    xpReward: 200,
    modules: [
      {
        id: "proj1_m1",
        title: "Setting up the HTML Structure",
        content:
          "Create the basic HTML structure with header, main sections, and footer.",
        steps: [
          "Create a new HTML file",
          "Set up the HTML boilerplate",
          "Create a header with navigation",
          "Add main content sections",
          "Add a footer",
        ],
        starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Portfolio</title>\n</head>\n<body>\n  <!-- Your code here -->\n</body>\n</html>`,
      },
      {
        id: "proj1_m2",
        title: "Styling with CSS",
        content:
          "Add responsive styling to make your portfolio look professional.",
        steps: [
          "Create a CSS file",
          "Style the header and navigation",
          "Style the main content sections",
          "Add responsive design with media queries",
          "Style the footer",
        ],
        starterCode: `/* styles.css */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n}\n\n/* Your code here */`,
      },
      {
        id: "proj1_m3",
        title: "Adding Interactivity with JavaScript",
        content: "Enhance your portfolio with JavaScript functionality.",
        steps: [
          "Create a JavaScript file",
          "Add a hamburger menu for mobile navigation",
          "Implement smooth scrolling",
          "Add form validation for the contact section",
          "Create a simple project filter",
        ],
        starterCode: `// script.js\n\n// Your code here`,
      },
    ],
  },
];

// Mock API delay to simulate network requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API Functions
export const api = {
  // Auth APIs
  auth: {
    login: async (email, password) => {
      await delay(800);
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return {
          success: true,
          user: userWithoutPassword,
          token: "mock-jwt-token",
        };
      }
      return { success: false, message: "Invalid credentials" };
    },

    register: async (userData) => {
      await delay(1000);
      // Check if email already exists
      if (users.find((u) => u.email === userData.email)) {
        return { success: false, message: "Email already registered" };
      }

      const newUser = {
        id: `user${users.length + 1}`,
        ...userData,
        role: "free",
        joined: new Date().toISOString().slice(0, 10),
        preferences: {
          theme: "light",
          fontSize: 14,
          language: "javascript",
          notifications: true,
        },
        progress: {
          xp: 0,
          level: 1,
          streak: 0,
          completedChallenges: [],
          completedProjects: [],
          certifications: [],
        },
      };

      users.push(newUser);
      const { password, ...userWithoutPassword } = newUser;
      return {
        success: true,
        user: userWithoutPassword,
        token: "mock-jwt-token",
      };
    },

    logout: async () => {
      await delay(300);
      return { success: true };
    },

    updateProfile: async (userId, profileData) => {
      await delay(700);
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex === -1) {
        return { success: false, message: "User not found" };
      }

      users[userIndex] = {
        ...users[userIndex],
        ...profileData,
      };

      const { password, ...userWithoutPassword } = users[userIndex];
      return { success: true, user: userWithoutPassword };
    },
  },

  // Learning APIs
  learning: {
    getLanguages: async () => {
      await delay(500);
      return { success: true, data: languages };
    },

    getLanguageById: async (languageId) => {
      await delay(300);
      const language = languages.find((l) => l.id === languageId);
      if (!language) {
        return { success: false, message: "Language not found" };
      }
      return { success: true, data: language };
    },

    getLearningPath: async (languageId) => {
      await delay(400);
      const language = languages.find((l) => l.id === languageId);
      if (!language) {
        return { success: false, message: "Language not found" };
      }
      return { success: true, data: language.path };
    },

    getLessonContent: async (lessonId) => {
      await delay(600);
      // In a real app, this would fetch from a database or CMS
      return {
        success: true,
        data: {
          id: lessonId,
          title: "Sample Lesson Content",
          content: "This is the content of the lesson...",
          examples: [
            {
              code: 'console.log("Hello World");',
              explanation: 'This prints "Hello World" to the console',
            },
          ],
          exercises: [
            {
              id: "ex1",
              prompt: 'Print "Hello CodeQuest" to the console',
              starterCode: "// Your code here",
              solution: 'console.log("Hello CodeQuest");',
            },
          ],
        },
      };
    },

    trackProgress: async (userId, lessonId, completed) => {
      await delay(500);
      // In a real app, this would update the user's progress in the database
      return { success: true };
    },
  },

  // Challenge APIs
  challenges: {
    getChallenges: async (filters = {}) => {
      await delay(600);
      let filteredChallenges = [...challenges];

      if (filters.language) {
        filteredChallenges = filteredChallenges.filter(
          (c) => c.language === filters.language
        );
      }

      if (filters.difficulty) {
        filteredChallenges = filteredChallenges.filter(
          (c) => c.difficulty === filters.difficulty
        );
      }

      return { success: true, data: filteredChallenges };
    },

    getChallengeById: async (challengeId) => {
      await delay(400);
      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge) {
        return { success: false, message: "Challenge not found" };
      }
      return { success: true, data: challenge };
    },

    submitSolution: async (userId, challengeId, code) => {
      await delay(1200); // Longer delay to simulate code execution
      const challenge = challenges.find((c) => c.id === challengeId);
      if (!challenge) {
        return { success: false, message: "Challenge not found" };
      }

      // In a real app, this would execute the code against test cases
      const passed = code.includes(challenge.solution.substring(10, 30));

      if (passed) {
        // Update user progress
        const userIndex = users.findIndex((u) => u.id === userId);
        if (
          userIndex !== -1 &&
          !users[userIndex].progress.completedChallenges.includes(challengeId)
        ) {
          users[userIndex].progress.xp += challenge.xpReward;
          users[userIndex].progress.completedChallenges.push(challengeId);
        }

        return {
          success: true,
          passed: true,
          message: "All test cases passed!",
          xpEarned: challenge.xpReward,
          feedback: "Great job! Your solution is correct and efficient.",
        };
      } else {
        return {
          success: true,
          passed: false,
          message: "Some test cases failed.",
          feedback: "Your solution doesn't pass all test cases. Try again!",
        };
      }
    },
  },
};
