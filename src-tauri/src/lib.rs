// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn open(url: &str) -> Result<String, String> {
    let result = open::that(url);
    if result.is_err() {
        println!("Failed to open browser: {:?}", result);
        return Err("Failed to open browser".into());
    }

    Ok("Opened browser".into())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|_app, argv, _cwd| {
            println!("single instance triggered: {argv:?}");
        }))
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![open])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
