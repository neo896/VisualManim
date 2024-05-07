// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::Write;
use tera::{Context, Tera};

#[derive(Serialize, Deserialize, Debug)]
enum NodeType {
    RectangleNode,
    FadeInNode,
}

#[derive(Serialize, Deserialize, Debug)]
struct Props {
    #[serde(flatten)]
    props: serde_json::Value,
}

#[derive(Serialize, Deserialize, Debug)]
struct Data {
    props: Props,
}

#[derive(Serialize, Default, Deserialize, Debug)]
struct Position {
    x: f64,
    y: f64,
}

#[derive(Serialize, Deserialize, Debug)]
struct Node {
    id: String,
    #[serde(rename = "type")]
    node_type: NodeType,
    #[serde(skip)]
    _position: Position,
    data: Data,
    #[serde(skip)]
    _width: f64,
    #[serde(skip)]
    _height: f64,
    #[serde(skip)]
    _selected: bool,
    #[serde(rename = "positionAbsolute")]
    #[serde(skip)]
    _position_absolute: Position,
    #[serde(skip)]
    _dragging: bool,
}

#[derive(Serialize, Deserialize, Debug)]
struct Graph {
    nodes: Vec<Node>,
    edges: Vec<Edge>,
    #[serde(skip)]
    viewport: Viewport,
}

#[derive(Serialize, Deserialize, Debug)]
struct Edge {
    id: String,
    source: String,
    target: String,
    #[serde(skip)]
    animated: bool,
}

#[derive(Serialize, Default, Deserialize, Debug)]
struct Viewport {
    x: f64,
    y: f64,
    zoom: f64,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(rename_all = "snake_case")]
fn play_scen(app_handle: tauri::AppHandle, nodes_json: &str) {
    let tera = match Tera::new("templates/*.tpl") {
        Ok(t) => t,
        Err(e) => {
            println!("Parsing error(s): {}", e);
            ::std::process::exit(1);
        }
    };

    let mut context = Context::new();

    let graph: Graph = serde_json::from_str(nodes_json).unwrap();

    context.insert("nodes", &graph.nodes);
    context.insert("edges", &graph.edges);

    if let Some(app_dir) = app_handle
        .path_resolver()
        .resolve_resource("../templates/scen.tpl")
    {
        let app_dir_str = app_dir.to_string_lossy().to_string();
        let res = tera.render(&app_dir_str, &context).unwrap();
        let mut file = File::create("code/scen.py").unwrap();
        file.write_all(res.as_bytes()).unwrap();
    } else {
        // 处理 app_dir 为空的情况
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![play_scen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
