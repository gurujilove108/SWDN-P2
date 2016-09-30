
<#
 * One of the best things about windows is windows powershell. Everyone is talking about it. I'm becoming a master at it
 * There are obviously many advantages of having a unix based system but truth is windows powershell is more advanced and 
 * More powerful than the unix or linux terminal.
 * This file just turns the gulp delete minified file functions into powershell functions.
#>
$app_paths = @{
    templates_root              = "templates/";
    index_html                  = "templates/index.html";
    js_file_path                = "static/js/*.js";
    css_file_ath                = "static/css/*.css";
    views_file_path             = "static/views/*.html";
    min_js_file_path 			      = "static/js/*.min.js";
    min_css_file_path           = "static/css/*.min.css";
    destination_jsmin_filepath 	= "static/js/site.min.js";
    destination_cssmin_filepath = "static/css/site.min.css"
}

# $app_roots = @{
#   swdnp2_root = "~/Desktop/Web_Development_Software/Udacity/Nanodegrees/SWDN-P2/"
# }

function delete_minified_js_files {
    rm $app_paths.min_js_file_path
}

function delete_minified_css_files {
    rm $app_paths.min_css_file_path
}

<# 
  What's also super cool is that I can run gulp tasks from here as well 
  So you can now run these powershell functions in the command line by running run_gulp_task "[gulp task name]"
  Lets say I wanted to run the gulp task I defined called delete:mincss or delete:minjs
  I would type run run_gulp_task "delete:minjs" or run_gulp_task "delete:mincss"
#>
function run_gulp_task($task_name) {
    gulp $task_name
}

<# Obviously runs the default task #>
function run_gulp_default {
    gulp
}

<#
    @param an array of gulp task names
    Iterates over each task and calls it
    In this function we just pipe the task array to the foreach cmdlet, inside the loop, the current
    Element is know as $_. Thus we can declare a variable $current_element = $_
    the function can be run like so run_all_tasks @("delete:minjs", "delete:mincss")
    It's obvious we already are doing this with gulp, its just fun to do the same thing in another way,
    Plus Powershell is so fun. Before I learned powershell I studied 2 books on linux shell scripting. Nothing like an OOP command line PL
#>
function run_all_tasks($gulp_task_args) {
    $gulp_task_args | foreach {
        gulp $_
    }
}

<# perhaps show some git information #>
function show_git_information {
  write (git config user.name)
  write (git config user.email)
}

<# Opens up a config file to edit git info like in a notepad file outside of the terminal #>
function open_git_config {
  git config --global --edit
}

<# Check if node_modules folder exists in the directory we pass in. If we ran the command ls node_modules, and there was no node_modules, then we would get an error. Using powershell we can add the -ErrorAction SilentlyContinue params so no error is shown. $variable_name = ls filename. $variable_name will be the powershell global variable $null if the filename doesn't exist #>
function node_modules_exists([String]$app_dir) {
  $node_mods_filepath = $app_dir + "/node_modules"
  $node_mods = ls $node_mods_filepath -ErrorAction SilentlyContinue
  return ($node_mods -ne $null)
}

<# Moves the node_modules folder into the documents folder, Use the -force param so even if the node_modules is already in documents, it is replaced/updated, then runs the command to upload the website to appengine. #>
function update_gae_app([String]$app_dir) {
  $node_mods_exists = (node_modules_exists $app_dir)
  if ($node_mods_exists) {
    write "[+] node_modules folder exists in $app_dir . Moving to Documents folder, otherwise we cant upload due to filename path too long errors."
    $node_mods_filepath = $app_dir + "/node_modules"
    mv $node_mods_filepath ~/Documents 
  }

  run_gae_update_command $app_dir
}

<# Starts the development server for a gae app, and adds the node_modules folder from documents into app_dir specified if it exists inside documents folder and does not exist inside the app_dir param #>
function start_gae_devserver([String]$app_dir) {
  if (!(node_modules_exists $app_dir)) {
    move_node_mods_into_app $app_dir
  }

  run_gae_devserver_command $app_dir
}

<# If node_modules does not exist inside our app folder -and exists inside the documents folder, then mv #>
function move_node_mods_into_app([String]$app_dir) {
  $transfer_condition = (!(node_modules_exists $app_dir -and node_modules_exists "~/Documents"))
  if ($transfer_condition) {
    mv ~/Documents/node_modules $app_dir
  } 

  elseif (node_modules_exists $app_dir) {
    write "[-] Node Modules already exists in $app_dir"
  } 

  elseif (!node_modules_exists "~/Documents") {
    write "[-] Node Modules does not exist inside {0}" -f "~/Documents"
  }

  else {
    write "Some other condition"
  }
}

<# Run the google app engine appcfg.py update command #>
function run_gae_update_command([String]$gae_root) {
  $app_dot_yaml = $gae_root + "/app.yaml"
  appcfg.py update $app_dot_yaml
}

<# Run the google app engine dev_appserver.py command #>
function run_gae_devserver_command([String]$gae_root) {
  $app_dot_yaml = $gae_root + "/app.yaml"
  dev_appserver.py $app_dot_yaml
}