<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user && $user->isAdmin()) {
            $articles = Article::with('user')
                ->latest()
                ->paginate(10);
        } else {
            $articles = Article::with('user')
                ->published()
                ->latest('published_at')
                ->paginate(10);
        }
        
        return Inertia::render('articles/index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('articles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticleRequest $request)
    {
        $articleData = $request->validated();
        
        if ($articleData['status'] === 'published') {
            $articleData['published_at'] = now();
        }
        
        $article = Article::create([
            'user_id' => auth()->id(),
            ...$articleData
        ]);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Artikel berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        // Check if article is published or user is admin
        if ($article->status !== 'published' && (!auth()->user() || !auth()->user()->isAdmin())) {
            abort(404);
        }
        
        $article->load(['user', 'comments.user']);
        
        return Inertia::render('articles/show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        return Inertia::render('articles/edit', [
            'article' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArticleRequest $request, Article $article)
    {
        $articleData = $request->validated();
        
        if ($articleData['status'] === 'published' && $article->status !== 'published') {
            $articleData['published_at'] = now();
        } elseif ($articleData['status'] === 'draft') {
            $articleData['published_at'] = null;
        }
        
        $article->update($articleData);

        return redirect()->route('articles.show', $article)
            ->with('success', 'Artikel berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }
}