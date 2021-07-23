import React, { useState, useRef, useEffect } from 'react';
import { IoMdCart } from 'react-icons/io';
import { MdAddShoppingCart, MdChevronLeft } from 'react-icons/md'
import './App.css';

function App() {
	
	const detailsPanel = useRef<HTMLDivElement>(null);
	const app = useRef<HTMLDivElement>(null)
	const navbar = useRef<HTMLDivElement>(null)
	const mainImg = useRef<HTMLImageElement>(null);
	const [cartQtd, setCartQtd] = useState(0);
	const [carrinhoItems, setCarrinhoItems] = useState({})
	const [showingDetails, setShowingDetails] = useState(false);
	const [item, setItem] = useState({nome: "", imagens: [], preco: 0, descricao: "", especificacoes: ""})
	
	const produtos = [
		{
			id: 0,
			nome: "Metal inoxidável",
			imagens: ["./assets/metal.png", "./assets/metalB.png"],
			preco: 1.8,
			descricao: "Carrinho de mão convencional com carroceria de aço inoxidável.",
			especificacoes: "Fingimos que aqui tem informação detalhada sobre o produto acima listado."
		},
		{
			id: 1,
			nome: "Carrin de plástico azul",
			imagens: ["./assets/plastic.png", "./assets/plasticB.png"],
			preco: 1.5,
			descricao: "Carrinho de mão convencional com carroceria de PVC biodegradável azul.",
			especificacoes: "Fingimos que aqui tem informação detalhada sobre o produto acima listado."
		},
		{
			id: 2,
			nome: "Carrin de plástico rosa",
			imagens: ["./assets/plasticPink.png", "./assets/plasticPinkB.png"],
			preco: 1.5,
			descricao: "Carrinho de mão convencional com carroceria de PVC biodegradável rosa.",
			especificacoes: "Fingimos que aqui tem informação detalhada sobre o produto acima listado."
		}
	]
	
	let carrinho: string;
	
	useEffect(() => {
		getCarrinho();
	}, [])
	
	const addCarrinho = (p: any) => {
		setCartQtd(cartQtd+1);
		setCarrinho(p.id);
	}
	
	const setCarrinho = (id: any) => {
		getCarrinho();
		if(carrinho !== null && carrinho.length > 0) {
			localStorage.setItem("carrinho", carrinho + `,${id}`);
		} else {
			localStorage.setItem("carrinho", `${id}`);
		}
		getCarrinho();
		console.log("set", localStorage.getItem("carrinho"))
	}
	
	const getCarrinho = () => {
		carrinho = localStorage.getItem("carrinho");
		if(carrinho === null || carrinho === "null") {
			carrinho = "";
		}
		
		if(carrinho !== null && carrinho.length > 0) {
			const listaProdutos: any = {};
			const listaProdutosArray = localStorage.getItem("carrinho").split(",")
			listaProdutosArray.forEach(function(i) { listaProdutos[i] = (listaProdutos[i]||0) + 1;});
			setCarrinhoItems(listaProdutos);
			console.log("get", listaProdutos)
		}
	}
	
	const clearCarrinho = () => {
		localStorage.setItem("carrinho", "");
		getCarrinho();
	}
	
	const showDetails = (p: any) => {
		setItem(p);
		//console.log(item)
		setShowingDetails(true);
		app.current.style.overflow = 'hidden';
		document.getElementsByTagName('body').item(0).style.overflow = 'hidden';
		detailsPanel.current.className = 'detailsPanel active';
	}
	
	const hideDetails = () => {
		setShowingDetails(false);
		app.current.style.overflow = 'initial';
		document.getElementsByTagName('body').item(0).style.overflow = 'auto';
		detailsPanel.current.className = 'detailsPanel';
	}
	
	const changeImg = (img:string) => {
		mainImg.current.src = img;
	}
	
	return (
		<div ref={app} className="App" >
			
			<div ref={navbar} className="navbar">
				
				<div className="logo">
					<img alt="logo" src="./assets/eCarrinhos.png"></img>
					<span>E-Carrinhos</span>
				</div>
				
				<div className="cart">
					<IoMdCart/>
					<div>{cartQtd}</div>
				</div>
				
			</div>
			
			<div className="banner" style={{ backgroundImage: "url(../assets/bg.png" }}>
				
				<div className="slogan">A maior loja de carrinhos de mão personalizados do mundo!</div>
				
				<div></div>
				
			</div>
			
			<div className="content">
				
				<div className="search">
					<input type="text" placeholder="BUSCAR" spellCheck="false" autoComplete="off"></input>
				</div>
				
				
				<div className="produtos">
				
					{
						produtos.map(produto => {
							
							return (
								<div className="produto" key={produto.nome}>
									<div className="description">{produto.nome}</div>
									<div className="image" style={{ backgroundImage: `url(${produto.imagens[0]})`}}></div>
									<div className="price"><span>$</span> {produto.preco}</div>
									<div className="buttons">
										<button onClick={() => { showDetails(produto) }} className="details">detalhes</button>
										<button onClick={() => { addCarrinho(produto) } } className="add"><MdAddShoppingCart/></button>
									</div>
								</div>
							)
						})
					}
					
				</div>
				
			</div>
			
			<div ref={detailsPanel} className="detailsPanel">
				
				<div className="goBack">
					<button onClick={() => { hideDetails() }}><MdChevronLeft/> voltar</button>
				</div>
				
				<div className="detailPresentation">
					
					<div className="media">
						
						<div className="thumbs">
							
							{
								item.imagens.map((imagem, key) => {
									return (
										<div key={key} onClick={() => { changeImg(imagem) }}>
											<img src={imagem} alt="carrinho"/>
										</div>
									)
								})
							}
							
						</div>
						
						<div className="imageDetail">
							<img alt="img" ref={mainImg} src={item.imagens[0]}></img>
						</div>
						
					</div>
					
					<div className="text">
						
						<h1>{item.nome}</h1>
						
						<p>{item.descricao}</p>
							
						<div className="priceDetails">
							<span>$</span> {item.preco}
						</div>
						
						<button onClick={() => {  } } className="add"><MdAddShoppingCart/></button>
						
					</div>
					
				</div>
				
				<div className="productDetails">
					
					<p>{item.especificacoes}</p>
					
				</div>
				
			</div>
			
			<div className="footer">
				
				Alguma informação importante aqui, talvez.
				
			</div>
			
		</div>
	);
}

export default App;

