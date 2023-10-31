<?php
use Illuminate\Support\Facades\Route;
$currentRouteName = Route::getCurrentRoute()->getName();

?>

<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <a class="sidebar-brand d-flex align-items-center justify-content-center">
        <div class="sidebar-brand-text mx-3">PFT</div>
    </a>
    <hr class="sidebar-divider my-0">
    <li class="nav-item {{ str_contains($currentRouteName, 'users') ? 'active' : '' }}">
        <a class="nav-link" href="{{ route('admin.users') }}">
            <i class="fas fa-users"></i>
            <span>Users</span></a>
    </li>
    <hr class="sidebar-divider d-none d-md-block">
    <li class="nav-item {{ str_contains($currentRouteName, 'stocks') ? 'active' : '' }}">
        <a class="nav-link" href="#">
            <i class="fas fa-users"></i>
            <span>Feedback Items</span></a>
    </li>
    <hr class="sidebar-divider d-none d-md-block">
    <li class="nav-item {{ str_contains($currentRouteName, 'stocks') ? 'active' : '' }}">
        <a class="nav-link" href="#">
            <i class="fas fa-fw fa-cog"></i>
            <span>Settings</span></a>
    </li>
    <hr class="sidebar-divider d-none d-md-block">
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
</ul>
